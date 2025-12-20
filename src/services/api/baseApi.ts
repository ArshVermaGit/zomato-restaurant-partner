import { createApi, retry, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import { ErrorCode, ApiError } from './api.types';

// --- Mutex for Token Refresh ---
class Mutex {
    private promise: Promise<void> | null = null;
    private resolve: (() => void) | null = null;

    async acquire() {
        while (this.promise) {
            await this.promise;
        }
        this.promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    release() {
        if (this.resolve) {
            this.resolve();
            this.promise = null;
            this.resolve = null;
        }
    }
}

const mutex = new Mutex();
const BASE_URL = 'http://localhost:3000/api';
const TIMEOUT_MS = 15000;

/**
 * Standardized Axios Base Query for Restaurant Partner App.
 * Features: Offline detection, Mutex refresh, Error transformation.
 */
const axiosBaseQuery = (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
    {
        url: string;
        method: AxiosRequestConfig['method'];
        data?: AxiosRequestConfig['data'];
        params?: AxiosRequestConfig['params'];
        headers?: AxiosRequestConfig['headers'];
        timeout?: number;
    },
    unknown,
    ApiError
> => async ({ url, method, data, params, headers, timeout = TIMEOUT_MS }, api, extraOptions) => {
    // 1. Offline Detection
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
        return {
            error: {
                status: 0,
                code: ErrorCode.OFFLINE,
                message: 'Restaurant is offline. Please reconnect to manage orders.',
                timestamp: new Date().toISOString(),
            },
        };
    }

    try {
        const token = await AsyncStorage.getItem('restaurant_token');
        const response = await axios({
            url: baseUrl + url,
            method,
            data,
            params,
            timeout,
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : '',
            },
        });
        return { data: response.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError<any>;
        const status = err.response?.status;
        const errorData = err.response?.data;

        // 2. Token Refresh Logic
        if (status === 401) {
            await mutex.acquire();
            try {
                const refreshToken = await AsyncStorage.getItem('restaurant_refresh_token');
                if (refreshToken) {
                    const refreshResult = await axios.post(`${baseUrl}/restaurant/auth/refresh`, { refreshToken });
                    if (refreshResult.data.accessToken) {
                        await AsyncStorage.setItem('restaurant_token', refreshResult.data.accessToken);
                        mutex.release();
                        return axiosBaseQuery({ baseUrl })({ url, method, data, params, headers, timeout }, api, extraOptions);
                    }
                }
            } catch (refreshErr) {
                console.error('[BaseApi] Restaurant refresh failed:', refreshErr);
                await AsyncStorage.multiRemove(['restaurant_token', 'restaurant_refresh_token']);
            } finally {
                mutex.release();
            }
        }

        // 3. Error Transformation
        let transformedError: ApiError = {
            status: status || 500,
            code: ErrorCode.UNKNOWN,
            message: errorData?.message || err.message || 'Server error occurred.',
            errors: errorData?.errors,
            timestamp: new Date().toISOString(),
        };

        if (err.code === 'ECONNABORTED') {
            transformedError.code = ErrorCode.TIMEOUT;
        } else if (status === 401) {
            transformedError.code = ErrorCode.UNAUTHORIZED;
        } else if (status && status >= 500) {
            transformedError.code = ErrorCode.SERVER_ERROR;
            transformedError.message = 'Service temporarily unavailable. Please try again.';
        }

        // 4. Global Feedbacks
        if (transformedError.code === ErrorCode.SERVER_ERROR) {
            Toast.show({ type: 'error', text1: 'Server Status', text2: transformedError.message });
        }

        return { error: transformedError };
    }
};

const staggeredBaseQuery = retry(
    axiosBaseQuery({ baseUrl: BASE_URL }),
    { maxRetries: 3 }
);

export const api = createApi({
    reducerPath: 'api',
    baseQuery: staggeredBaseQuery,
    tagTypes: ['Stats', 'Orders', 'Menu', 'Profile'],
    endpoints: () => ({}),
});

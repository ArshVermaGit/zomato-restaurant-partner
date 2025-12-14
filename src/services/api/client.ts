import axios from 'axios';
import { store } from '../../store';
import { logout } from '../../store/slices/authSlice';

import { Platform } from 'react-native';

// Use 10.0.2.2 for Android Emulator, localhost for iOS Simulator
const API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000';

const client = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token
client.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors (e.g., 401)
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default client;

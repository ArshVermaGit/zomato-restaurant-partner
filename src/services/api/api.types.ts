import {
    ApiError as SharedApiError,
    ApiResponse as SharedApiResponse,
    ErrorCode as SharedErrorCode,
    Order as SharedOrder
} from '@zomato/shared-types';

/**
 * Re-exporting shared types
 */
export type ErrorCode = SharedErrorCode;
export const ErrorCode = SharedErrorCode;

export type ApiError = SharedApiError;
export type ApiResponse<T> = SharedApiResponse<T>;

/**
 * Restaurant Domain Types
 */

export interface RestaurantStats {
    todayOrders: number;
    todayEarnings: number;
    averageRating: number;
    activeMenuCount: number;
}

export type OrderDetail = SharedOrder & {
    customerName: string;
};

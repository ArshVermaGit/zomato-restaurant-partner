/**
 * Generic API Types for Zomato Restaurant Ecosystem
 */

export enum ErrorCode {
    NETWORK_ERROR = 'NETWORK_ERROR',
    TIMEOUT = 'TIMEOUT',
    OFFLINE = 'OFFLINE',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    SERVER_ERROR = 'SERVER_ERROR',
    UNKNOWN = 'UNKNOWN',
}

export interface ApiError {
    status?: number;
    code: ErrorCode;
    message: string;
    errors?: Record<string, string[]>;
    timestamp: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        hasNextPage: boolean;
    };
}

/**
 * Restaurant Domain Types
 */

export interface RestaurantStats {
    todayOrders: number;
    todayEarnings: number;
    averageRating: number;
    activeMenuCount: number;
}

export interface OrderDetail {
    id: string;
    orderNumber: string;
    status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';
    customerName: string;
    totalAmount: number;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
}

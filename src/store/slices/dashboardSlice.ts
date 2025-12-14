import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardStats {
    revenue: number;
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    avgPrepTime: number; // in minutes
}

export interface Order {
    id: string;
    customerName: string;
    items: { name: string; quantity: number }[];
    amount: number;
    status: 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
    createdAt: string;
    expiryTime?: string; // For pending orders
}

interface DashboardState {
    stats: DashboardStats;
    pendingOrders: Order[];
    recentOrders: Order[];
    isOpen: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    stats: {
        revenue: 0,
        totalOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        avgPrepTime: 0,
    },
    pendingOrders: [],
    recentOrders: [],
    isOpen: false,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setStats: (state, action: PayloadAction<DashboardStats>) => {
            state.stats = action.payload;
        },
        setPendingOrders: (state, action: PayloadAction<Order[]>) => {
            state.pendingOrders = action.payload;
        },
        setRecentOrders: (state, action: PayloadAction<Order[]>) => {
            state.recentOrders = action.payload;
        },
        setRestaurantStatus: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        addPendingOrder: (state, action: PayloadAction<Order>) => {
            state.pendingOrders.unshift(action.payload);
        },
        removePendingOrder: (state, action: PayloadAction<string>) => {
            state.pendingOrders = state.pendingOrders.filter(o => o.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
});

export const {
    setStats,
    setPendingOrders,
    setRecentOrders,
    setRestaurantStatus,
    addPendingOrder,
    removePendingOrder,
    setLoading,
    setError
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

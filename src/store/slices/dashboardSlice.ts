import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RestaurantService } from '../../services/api/restaurant';

export interface DashboardStats {
    revenue: number;
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    avgPrepTime: number; // in minutes
    rating: number;
}

export interface Order {
    id: string;
    customerName: string;
    items: { name: string; quantity: number }[];
    amount: number;
    status: 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
    createdAt: string;
    expiryTime?: string;
    // Add other fields needed for detail
    customerPhone?: string;
    deliveryAddress?: string;
    instructions?: string;
    paymentMethod?: string;
    breakdown?: any;
    pickupOTP?: string;
}

interface DashboardState {
    stats: DashboardStats;
    pendingOrders: Order[];
    recentOrders: Order[];
    currentOrder: Order | null;
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
        rating: 0,
    },
    pendingOrders: [],
    recentOrders: [],
    currentOrder: null,
    isOpen: false,
    loading: false,
    error: null,
};

// Async Thunks
export const fetchOrderDetails = createAsyncThunk(
    'dashboard/fetchOrderDetails',
    async (orderId: string, { rejectWithValue }) => {
        try {
            return await RestaurantService.getOrderDetails(orderId);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'dashboard/updateOrderStatus',
    async ({ orderId, status }: { orderId: string, status: string }, { rejectWithValue }) => {
        try {
            switch (status) {
                case 'ACCEPTED': await RestaurantService.acceptOrder(orderId); break;
                case 'REJECTED': await RestaurantService.rejectOrder(orderId); break;
                case 'PREPARING': await RestaurantService.markOrderPreparing(orderId); break;
                case 'READY': await RestaurantService.markOrderReady(orderId); break;
            }
            return { orderId, status };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

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
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload as unknown as Order;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update Status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                if (state.currentOrder && state.currentOrder.id === action.payload.orderId) {
                    // Update local state
                    // Note: Ideally fetch fresh from backend, but optimistically update for now
                    // Mapping simple status back to enum if able, or just refreshing
                }
                // Refresh list if needed (handled by separate polling or socket)
            });
    }
});

export const {
    setStats,
    setPendingOrders,
    setRecentOrders,
    setRestaurantStatus,
    addPendingOrder,
    removePendingOrder,
    setLoading,
    setError,
    clearCurrentOrder
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

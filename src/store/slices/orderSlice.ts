import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from './dashboardSlice'; // Reusing Order interface

export interface OrderState {
    orders: Record<string, Order>; // Normalized structure for easy updates
    filterStatus: string; // 'ALL', 'PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: {},
    filterStatus: 'PENDING',
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload.reduce((acc, order) => {
                acc[order.id] = order;
                return acc;
            }, {} as Record<string, Order>);
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            state.orders[action.payload.id] = action.payload;
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
            if (state.orders[action.payload.id]) {
                state.orders[action.payload.id].status = action.payload.status;
            }
        },
        setFilterStatus: (state, action: PayloadAction<string>) => {
            state.filterStatus = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setOrders, updateOrder, updateOrderStatus, setFilterStatus, setLoading } = orderSlice.actions;
export default orderSlice.reducer;

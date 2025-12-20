import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
    id: string;
    type: 'ORDER_NEW' | 'ORDER_CANCELLED' | 'RIDER_ASSIGNED' | 'REVIEW_RECEIVED' | 'PAYMENT_RECEIVED' | 'SYSTEM';
    title: string;
    message: string;
    timestamp: string;
    data?: any; // e.g., orderId
    read: boolean;
}

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
}

const initialState: NotificationState = {
    notifications: [],
    unreadCount: 0,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload);
            state.unreadCount += 1;
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(n => { n.read = true; });
            state.unreadCount = 0;
        },
        clearAllNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        }
    },
});

export const { addNotification, markAsRead, markAllAsRead, clearAllNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

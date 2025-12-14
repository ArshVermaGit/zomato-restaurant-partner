import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DashboardScreen from '../DashboardScreen';
import restaurantReducer from '../../store/slices/restaurantSlice';
import dashboardReducer from '../../store/slices/dashboardSlice';
import { RestaurantService } from '../../services/api/restaurant';

// Mock dependnecies
jest.mock('../../services/api/restaurant');
jest.mock('../../services/notification/NotificationService', () => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({ navigate: jest.fn() }),
}));

// Setup Mock Store
const createTestStore = () => configureStore({
    reducer: {
        restaurant: restaurantReducer,
        dashboard: dashboardReducer,
        // Mock other required reducers minimally
        auth: (state = { token: 'test' }) => state,
        notification: (state = { unreadCount: 0 }) => state,
    }
});

describe('Dashboard Integration', () => {
    it('loads and displays dashboard data on mount', async () => {
        // Setup initial state with a selected restaurant
        const store = createTestStore();
        store.dispatch({
            type: 'restaurant/selectRestaurant',
            payload: { id: 'rest_1', name: 'Test Restaurant', status: 'ACTIVE' }
        });

        // Mock API responses
        (RestaurantService.getDashboardStats as jest.Mock).mockResolvedValue({
            revenue: 5000, totalOrders: 10, completedOrders: 8, cancelledOrders: 2, avgPrepTime: 15
        });
        (RestaurantService.getPendingOrders as jest.Mock).mockResolvedValue([]);
        (RestaurantService.getRecentOrders as jest.Mock).mockResolvedValue([]);

        const { getByText } = render(
            <Provider store={store}>
                <DashboardScreen />
            </Provider>
        );

        // Verify Header renders synchronously
        expect(getByText('Test Restaurant')).toBeTruthy();

        // Verify Async Data Load
        await waitFor(() => {
            expect(getByText('₹5,000')).toBeTruthy(); // Revenue from stats
            expect(getByText('Total Orders: 10')).toBeTruthy();
        });
    });
});

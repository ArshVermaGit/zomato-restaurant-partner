import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantSelectionScreen from '../screens/auth/RestaurantSelectionScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { OrdersStack } from './OrdersStack';
import { MenuStack } from './MenuStack'; // Import MenuStack
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import KitchenDisplayScreen from '../screens/orders/KitchenDisplayScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import ReviewsScreen from '../screens/reviews/ReviewsScreen';
import { FinancialStack } from './FinancialStack';
import { BottomTabNavigator } from './BottomTabNavigator';
import NotificationsListScreen from '../screens/notifications/NotificationsListScreen';
// Ideally Financials is part of 'More' or a specific flow. Let's keep it as is or integrate. 
// For now, let's allow overlapping stacks if deep linking is needed. 
// A better approach: The 'Main' app is the TabNavigator. 
// Screens that hide the tab bar (like full screen maps or detailed flows) can be here.

const Stack = createStackNavigator();

export const MainStack = () => {
    const currentRestaurant = useSelector((state: RootState) => state.restaurant.currentRestaurant);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* If no restaurant is selected, force selection screen */}
            {!currentRestaurant ? (
                <Stack.Screen name="RestaurantSelection" component={RestaurantSelectionScreen} />
            ) : (
                <>
                    <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
                    <Stack.Screen name="KDS" component={KitchenDisplayScreen} />
                    <Stack.Screen name="Reviews" component={ReviewsScreen} />
                    <Stack.Screen name="Financials" component={FinancialStack} />
                    <Stack.Screen name="Notifications" component={NotificationsListScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

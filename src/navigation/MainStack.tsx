import React from 'react';
import { createStackNavigator, CardStyleInterpolators, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import RestaurantSelectionScreen from '../screens/auth/RestaurantSelectionScreen';
import { RestaurantSplashScreen } from '../screens/auth/RestaurantSplashScreen';
import { RestaurantOnboardingScreen } from '../screens/auth/RestaurantOnboardingScreen';
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
import RestaurantNotificationsScreen from '../screens/notifications/RestaurantNotificationsScreen';

const Stack = createStackNavigator();

export const MainStack = () => {
    const currentRestaurant = useSelector((state: RootState) => state.restaurant.currentRestaurant);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                },
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
        >
            {/* If no restaurant is selected, force selection screen */}
            {!currentRestaurant ? (
                <>
                    <Stack.Screen name="Splash" component={RestaurantSplashScreen} />
                    <Stack.Screen name="Onboarding" component={RestaurantOnboardingScreen} />
                    <Stack.Screen name="RestaurantSelection" component={RestaurantSelectionScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
                    <Stack.Screen name="KDS" component={KitchenDisplayScreen} />
                    <Stack.Screen name="Reviews" component={ReviewsScreen} />
                    <Stack.Screen name="Financials" component={FinancialStack} />
                    <Stack.Screen name="Notifications" component={RestaurantNotificationsScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

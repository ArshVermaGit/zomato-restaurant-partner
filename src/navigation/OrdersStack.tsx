import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from '../screens/orders/OrdersScreen';
import KitchenDisplayScreen from '../screens/orders/KitchenDisplayScreen';
import { RestaurantOrderDetailScreen } from '../screens/orders/RestaurantOrderDetailScreen';

const Stack = createStackNavigator();

export const OrdersStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OrdersList" component={OrdersScreen} />
            <Stack.Screen name="KitchenDisplay" component={KitchenDisplayScreen} />
            <Stack.Screen name="RestaurantOrderDetail" component={RestaurantOrderDetailScreen} />
        </Stack.Navigator>
    );
};

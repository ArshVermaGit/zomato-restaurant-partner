import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from '../screens/orders/OrdersScreen';
import KitchenDisplayScreen from '../screens/orders/KitchenDisplayScreen';
// import OrderDetailScreen from '../screens/orders/OrderDetailScreen'; // Will implement next if needed

const Stack = createStackNavigator();

export const OrdersStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OrdersList" component={OrdersScreen} />
            <Stack.Screen name="KitchenDisplay" component={KitchenDisplayScreen} />
            {/* <Stack.Screen name="OrderDetail" component={OrderDetailScreen} /> */}
        </Stack.Navigator>
    );
};

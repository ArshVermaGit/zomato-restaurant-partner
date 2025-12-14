import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FinancialsScreen from '../screens/financials/FinancialsScreen';
import TransactionsScreen from '../screens/financials/TransactionsScreen';
import PayoutsScreen from '../screens/financials/PayoutsScreen';

const Stack = createStackNavigator();

export const FinancialStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FinancialsDashboard" component={FinancialsScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
            <Stack.Screen name="Payouts" component={PayoutsScreen} />
        </Stack.Navigator>
    );
};

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, List, FileText, BarChart2, MoreHorizontal } from 'lucide-react-native';

import DashboardScreen from '../screens/DashboardScreen';
import { OrdersStack } from './OrdersStack';
import { MenuStack } from './MenuStack';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import { SettingsStack } from './SettingsStack';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#E23744',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#EEE',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                    tabBarLabel: 'Home'
                }}
            />
            <Tab.Screen
                name="OrdersTab"
                component={OrdersStack}
                options={{
                    tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
                    tabBarLabel: 'Orders'
                }}
            />
            <Tab.Screen
                name="MenuTab"
                component={MenuStack}
                options={{
                    tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
                    tabBarLabel: 'Menu'
                }}
            />
            <Tab.Screen
                name="AnalyticsTab"
                component={AnalyticsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
                    tabBarLabel: 'Analytics'
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsStack}
                options={{
                    tabBarIcon: ({ color, size }) => <MoreHorizontal size={size} color={color} />,
                    tabBarLabel: 'More'
                }}
            />
        </Tab.Navigator>
    );
};

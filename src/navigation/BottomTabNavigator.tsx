import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, List, FileText, BarChart2, MoreHorizontal } from 'lucide-react-native';
import { colors, typography, shadows } from '@zomato/design-tokens';

import DashboardScreen from '../screens/DashboardScreen';
import { OrdersStack } from './OrdersStack';
import { MenuStack } from './MenuStack';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import { SettingsStack } from './SettingsStack';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary.zomato_red,
                tabBarInactiveTintColor: colors.secondary.gray_500,
                tabBarStyle: {
                    backgroundColor: colors.secondary.white,
                    borderTopWidth: 0,
                    ...shadows.lg,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    ...typography.caption,
                    fontWeight: '600',
                },
                tabBarIcon: ({ color, size }) => {
                    let Icon;
                    switch (route.name) {
                        case 'Home': Icon = Home; break;
                        case 'OrdersTab': Icon = List; break;
                        case 'MenuTab': Icon = FileText; break;
                        case 'AnalyticsTab': Icon = BarChart2; break;
                        case 'SettingsTab': Icon = MoreHorizontal; break;
                        default: Icon = Home;
                    }
                    const LucideIcon = Icon as any;
                    return <LucideIcon size={24} color={color} />;
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={DashboardScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="OrdersTab"
                component={OrdersStack}
                options={{ tabBarLabel: 'Orders' }}
            />
            <Tab.Screen
                name="MenuTab"
                component={MenuStack}
                options={{ tabBarLabel: 'Menu' }}
            />
            <Tab.Screen
                name="AnalyticsTab"
                component={AnalyticsScreen}
                options={{ tabBarLabel: 'Analytics' }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsStack}
                options={{ tabBarLabel: 'More' }}
            />
        </Tab.Navigator>
    );
};

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ShoppingBag, FileText, BarChart2, MoreHorizontal } from 'lucide-react-native';
import { colors, typography, shadows } from '@zomato/design-tokens';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import DashboardScreen from '../screens/DashboardScreen';
import { OrdersStack } from './OrdersStack';
import { MenuStack } from './MenuStack';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import { SettingsStack } from './SettingsStack';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    // Calculate pending orders count
    const orders = useSelector((state: RootState) => state.orders.orders);
    const pendingCount = Object.values(orders).filter(o => o.status === 'PENDING').length;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary.zomato_red,
                tabBarInactiveTintColor: colors.secondary.gray_500,
                tabBarStyle: {
                    backgroundColor: colors.secondary.white,
                    borderTopWidth: 0,
                    height: 70,
                    paddingTop: 10,
                    paddingBottom: 10,
                    ...shadows.lg,
                },
                tabBarLabelStyle: {
                    ...typography.caption,
                    fontSize: 10,
                    marginBottom: 5,
                    fontWeight: '600',
                },
                tabBarIcon: ({ color, focused }) => {
                    let Icon;
                    switch (route.name) {
                        case 'Home': Icon = Home; break;
                        case 'OrdersTab': Icon = ShoppingBag; break;
                        case 'MenuTab': Icon = FileText; break;
                        case 'AnalyticsTab': Icon = BarChart2; break;
                        case 'SettingsTab': Icon = MoreHorizontal; break;
                        default: Icon = Home;
                    }
                    const LucideIcon = Icon as any;
                    return (
                        <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                            <LucideIcon size={24} color={color} />
                        </View>
                    );
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
                options={{
                    tabBarLabel: 'Orders',
                    tabBarBadge: pendingCount > 0 ? pendingCount : undefined,
                    tabBarBadgeStyle: { backgroundColor: colors.primary.zomato_red, color: 'white' }
                }}
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

const styles = StyleSheet.create({
    tabIcon: {
        padding: 5,
        borderRadius: 20,
    },
    tabIconActive: {
        backgroundColor: colors.primary.zomato_red_light + '20', // Add 20% opacity
    }
});

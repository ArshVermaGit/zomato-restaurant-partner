import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, DrawerLayoutAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store';
import {
    setStats,
    setPendingOrders,
    setRecentOrders,
    setRestaurantStatus
} from '../store/slices/dashboardSlice';
import { RestaurantService } from '../services/api/restaurant';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatusToggle from '../components/dashboard/StatusToggle';
import OverviewCards from '../components/dashboard/OverviewCards';
import PendingOrders from '../components/dashboard/PendingOrders';
import QuickActions from '../components/dashboard/QuickActions';
import RecentOrders from '../components/dashboard/RecentOrders';
import NotificationToast from '../components/common/NotificationToast';
import SidebarNavigation from '../components/common/SidebarNavigation';
import NotificationService from '../services/notification/NotificationService';

const DashboardScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const drawer = useRef<DrawerLayoutAndroid>(null);

    const { currentRestaurant } = useSelector((state: RootState) => state.restaurant);
    const dashboardState = useSelector((state: RootState) => state.dashboard);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (currentRestaurant) {
            loadDashboardData();
            // Sync local state with global store if needed
            dispatch(setRestaurantStatus(currentRestaurant.status === 'ACTIVE'));

            // Connect WebSocket
            NotificationService.connect(currentRestaurant.id);
        }
        return () => NotificationService.disconnect();
    }, [currentRestaurant]);

    const loadDashboardData = async () => {
        if (!currentRestaurant) return;
        try {
            const stats = await RestaurantService.getDashboardStats(currentRestaurant.id);
            dispatch(setStats(stats));

            const pending = await RestaurantService.getPendingOrders(currentRestaurant.id);
            // @ts-ignore
            dispatch(setPendingOrders(pending));

            const recent = await RestaurantService.getRecentOrders(currentRestaurant.id);
            // @ts-ignore
            dispatch(setRecentOrders(recent));
        } catch (error) {
            console.error('Failed to load dashboard', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadDashboardData();
        setRefreshing(false);
    };

    if (!currentRestaurant) return null;

    const handleAcceptOrder = async (orderId: string) => {
        await RestaurantService.acceptOrder(orderId);
        loadDashboardData();
    };

    const handleRejectOrder = async (orderId: string) => {
        await RestaurantService.rejectOrder(orderId);
        loadDashboardData();
    };

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={() => <SidebarNavigation onClose={() => drawer.current?.closeDrawer()} />}
        >
            <View style={styles.container}>
                <NotificationToast />
                <DashboardHeader
                    restaurantName={currentRestaurant?.name || 'Restaurant'}
                    isOpen={dashboardState.isOpen}
                    onMenuPress={() => drawer.current?.openDrawer()}
                />

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <StatusToggle
                        isOpen={dashboardState.isOpen}
                        // @ts-ignore
                        onToggle={() => { }} // Handle toggle logic locally or add handler
                    />

                    <OverviewCards stats={dashboardState.stats} />

                    <QuickActions />

                    <PendingOrders
                        orders={dashboardState.pendingOrders}
                        onAccept={handleAcceptOrder}
                        onReject={handleRejectOrder}
                    />

                    <RecentOrders orders={dashboardState.recentOrders} />
                </ScrollView>
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContent: {
        paddingBottom: 40,
    }
});

export default DashboardScreen;

import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Text, TouchableOpacity, Alert, DrawerLayoutAndroid, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store';
import {
    setStats,
    setPendingOrders,
    setRecentOrders
} from '../store/slices/dashboardSlice';
import { RestaurantService } from '../services/api/restaurant';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
    Bell, Store, AlertCircle, Package, DollarSign, Clock, Star,
    FileText, BarChart3, MessageSquare, Settings, TrendingUp, XCircle
} from 'lucide-react-native';
import { Button } from '@zomato/ui';
import NotificationToast from '../components/common/NotificationToast';
import SidebarNavigation from '../components/common/SidebarNavigation';
import NotificationService from '../services/notification/NotificationService';

// StoreOff is not exported by lucide-react-native sometimes, fall back or check.
// Checking lucide-react-native exports... StoreOff seems valid.

const DashboardScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const drawer = useRef<DrawerLayoutAndroid>(null);

    const { currentRestaurant } = useSelector((state: RootState) => state.restaurant);
    const dashboardState = useSelector((state: RootState) => state.dashboard); // Assumes dashboard slice has stats, pendingOrders etc.
    const [refreshing, setRefreshing] = useState(false);

    // Local state for UI responsiveness (optimistic updates), synced with Redux via effects
    const [isOpen, setIsOpen] = useState(false);

    const loadDashboardData = React.useCallback(async () => {
        if (!currentRestaurant) return;
        try {
            const stats = await RestaurantService.getDashboardStats(currentRestaurant.id);
            dispatch(setStats(stats));

            const pending = await RestaurantService.getPendingOrders(currentRestaurant.id);
            dispatch(setPendingOrders(pending));

            const recent = await RestaurantService.getRecentOrders(currentRestaurant.id);
            dispatch(setRecentOrders(recent));
        } catch (error) {
            console.error('Failed to load dashboard', error);
        }
    }, [currentRestaurant, dispatch]);

    useEffect(() => {
        if (currentRestaurant) {
            loadDashboardData();
            setIsOpen(currentRestaurant.status === 'ACTIVE');
            NotificationService.connect(currentRestaurant.id);
        }
        return () => NotificationService.disconnect();
    }, [currentRestaurant, loadDashboardData]);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadDashboardData();
        setRefreshing(false);
    };

    const toggleRestaurantStatus = () => {
        // Haptic feedback could be added here
        Alert.alert(
            isOpen ? 'Close Restaurant?' : 'Open Restaurant?',
            isOpen
                ? 'You will stop receiving new orders'
                : 'You will start receiving orders',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: isOpen ? 'Close' : 'Open',
                    onPress: async () => {
                        // Optimistic update
                        setIsOpen(!isOpen);
                        // Call API (mocked mainly in service)
                        // dispatch(setRestaurantStatus(!isOpen));
                    },
                    style: isOpen ? 'destructive' : 'default'
                },
            ]
        );
    };

    // Helpers
    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Morning';
        if (hour < 18) return 'Afternoon';
        return 'Evening';
    };

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    if (!currentRestaurant) return null;

    // Mapping Redux state to local vars for snippet compatibility
    const todayStats = dashboardState.stats || { totalOrders: 0, revenue: 0, avgPrepTime: 0, rating: 0 };
    const pendingOrders = dashboardState.pendingOrders || [];
    const recentOrders = dashboardState.recentOrders || [];
    const unreadCount = 3; // Mock

    // Sub-components defined inside or outside. 
    // Defining outside to keep main component clean, but passing props.

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={() => <SidebarNavigation onClose={() => drawer.current?.closeDrawer()} />}
        >
            <SafeAreaView style={styles.container}>
                <NotificationToast />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.greeting}>Good {getTimeOfDay()},</Text>
                            <Text style={styles.restaurantName}>{currentRestaurant.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notifications')}>
                            <Bell size={24} color={colors.gray_900} />
                            {unreadCount > 0 && (
                                <View style={styles.notificationBadge}>
                                    <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Restaurant Status Toggle */}
                    <Animated.View entering={FadeInDown} style={styles.statusCard}>
                        <View style={styles.statusHeader}>
                            <View style={styles.statusLeft}>
                                <View style={[
                                    styles.statusIcon,
                                    { backgroundColor: isOpen ? colors.success : colors.gray_400 }
                                ]}>
                                    {isOpen ? (
                                        <Store size={24} color={colors.white} />
                                    ) : (
                                        <XCircle size={24} color={colors.white} />
                                    )}
                                </View>
                                <View>
                                    <Text style={styles.statusLabel}>Restaurant Status</Text>
                                    <Text style={[
                                        styles.statusText,
                                        { color: isOpen ? colors.success : colors.gray_600 }
                                    ]}>
                                        {isOpen ? 'Open for Orders' : 'Closed'}
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={isOpen}
                                onValueChange={toggleRestaurantStatus}
                                trackColor={{ false: colors.gray_300, true: colors.success }}
                                thumbColor={colors.white}
                                ios_backgroundColor={colors.gray_300}
                            />
                        </View>

                        {!isOpen && (
                            <Animated.View entering={FadeInDown} style={styles.closedWarning}>
                                <AlertCircle size={16} color={colors.warning} />
                                <Text style={styles.closedWarningText}>
                                    Turn on to start receiving orders
                                </Text>
                            </Animated.View>
                        )}
                    </Animated.View>

                    {/* Today's Stats */}
                    <Animated.View entering={FadeInDown.delay(100)} style={styles.statsCard}>
                        <View style={styles.statsHeader}>
                            <Text style={styles.statsTitle}>Today's Overview</Text>
                            <Text style={styles.statsDate}>{getCurrentDate()}</Text>
                        </View>

                        <View style={styles.statsGrid}>
                            <StatBox
                                icon={<Package size={20} color={colors.zomato_red} />}
                                label="Orders"
                                value={todayStats.totalOrders}
                                change="+12%" // Mock
                                changeType="positive"
                            />
                            <StatBox
                                icon={<DollarSign size={20} color={colors.success} />}
                                label="Revenue"
                                value={`₹${todayStats.revenue}`}
                                change="+8%" // Mock
                                changeType="positive"
                            />
                            <StatBox
                                icon={<Clock size={20} color={colors.info} />}
                                label="Avg Prep Time"
                                value={`${todayStats.avgPrepTime}m`}
                                change="-2m" // Mock
                                changeType="positive"
                            />
                            <StatBox
                                icon={<Star size={20} color={colors.warning} />}
                                label="Rating"
                                value={todayStats.rating}
                                change="+0.2" // Mock
                                changeType="positive"
                            />
                        </View>
                    </Animated.View>

                    {/* Pending Orders Alert */}
                    {pendingOrders.length > 0 && (
                        <Animated.View entering={FadeInDown.delay(200)} style={styles.pendingAlert}>
                            <View style={styles.pendingHeader}>
                                <View style={styles.pendingIconContainer}>
                                    <AlertCircle size={24} color={colors.error} />
                                </View>
                                <View style={styles.pendingInfo}>
                                    <Text style={styles.pendingTitle}>
                                        {pendingOrders.length} Pending {pendingOrders.length === 1 ? 'Order' : 'Orders'}
                                    </Text>
                                    <Text style={styles.pendingSubtitle}>Action required</Text>
                                </View>
                            </View>
                            <Button
                                variant="primary"
                                size="small"
                                onPress={() => navigation.navigate('Orders', { screen: 'Pending' })} // Updated Nav
                            >
                                View Orders
                            </Button>
                        </Animated.View>
                    )}

                    {/* Recent Orders */}
                    <Animated.View entering={FadeInDown.delay(300)} style={styles.recentOrdersCard}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Recent Orders</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                                <Text style={styles.viewAllLink}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        {recentOrders.map((order: any) => (
                            <OrderCard key={order.id} order={order} compact navigation={navigation} />
                        ))}
                    </Animated.View>

                    {/* Quick Actions */}
                    <View style={styles.quickActions}>
                        <QuickActionCard
                            icon={<FileText size={24} color={colors.zomato_red} />}
                            title="Menu"
                            subtitle="Update items"
                            onPress={() => navigation.navigate('Menu')}
                        />
                        <QuickActionCard
                            icon={<BarChart3 size={24} color={colors.info} />}
                            title="Analytics"
                            subtitle="View reports"
                            onPress={() => navigation.navigate('Analytics')}
                        />
                        <QuickActionCard
                            icon={<MessageSquare size={24} color={colors.success} />}
                            title="Reviews"
                            subtitle="Read feedback"
                            onPress={() => navigation.navigate('Reviews')}
                        />
                        <QuickActionCard
                            icon={<Settings size={24} color={colors.gray_700} />}
                            title="Settings"
                            subtitle="Manage account"
                            onPress={() => navigation.navigate('RestaurantSelection')} // Or Settings/Profile
                        />
                    </View>

                    <View style={styles.tabSpacing} />
                </ScrollView>
            </SafeAreaView>
        </DrawerLayoutAndroid>
    );
};

// Sub-components
const StatBox = ({ icon, label, value, change, changeType }: any) => (
    <View style={styles.statBox}>
        <View style={styles.statIcon}>{icon}</View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        {change && (
            <View style={[
                styles.statChange,
                { backgroundColor: changeType === 'positive' ? colors.success_light : colors.error_light }
            ]}>
                <TrendingUp size={10} color={changeType === 'positive' ? colors.success : colors.error} />
                <Text style={[
                    styles.statChangeText,
                    { color: changeType === 'positive' ? colors.success : colors.error }
                ]}>
                    {change}
                </Text>
            </View>
        )}
    </View>
);

const QuickActionCard = ({ icon, title, subtitle, onPress }: any) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
        <View style={styles.quickActionIcon}>{icon}</View>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
);

const OrderCard = ({ order, compact }: any) => (
    <TouchableOpacity
        style={[styles.orderCard, compact && styles.orderCardCompact]}
    >
        <View style={styles.orderHeader}>
            <Text style={styles.orderId}>#{order.id.substring(0, 6)}</Text>
            {/* StatusBadge would be here, skipping for MVP or simple Text */}
            <Text style={styles.orderStatusText}>{order.status}</Text>
        </View>
        <Text style={styles.orderCustomer}>{order.customer?.name || 'Customer'}</Text>
        <View style={styles.orderFooter}>
            <Text style={styles.orderItems}>{order.items?.length || 0} items</Text>
            <Text style={styles.orderAmount}>₹{order.totalAmount}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.gray_50 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.base, backgroundColor: colors.white },
    greeting: { ...typography.body_medium, color: colors.gray_600 },
    restaurantName: { ...typography.h2, color: colors.gray_900, marginTop: 2 },
    notificationButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', position: 'relative' },
    notificationBadge: { position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.error, alignItems: 'center', justifyContent: 'center' },
    notificationBadgeText: { ...typography.caption, fontSize: 10, color: colors.white, fontWeight: '700' },
    statusCard: { backgroundColor: colors.white, margin: spacing.base, borderRadius: borderRadius.xl, padding: spacing.base, ...shadows.card },
    statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statusLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
    statusIcon: { width: 48, height: 48, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center' },
    statusLabel: { ...typography.caption, color: colors.gray_600, marginBottom: 2 },
    statusText: { ...typography.label_medium, fontWeight: '600' },
    closedWarning: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.warning_light, padding: spacing.md, borderRadius: borderRadius.lg, marginTop: spacing.base },
    closedWarningText: { ...typography.body_small, color: colors.warning, flex: 1 },
    statsCard: { backgroundColor: colors.white, margin: spacing.base, marginTop: 0, borderRadius: borderRadius.xl, padding: spacing.base, ...shadows.card },
    statsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.base },
    statsTitle: { ...typography.label_medium, color: colors.gray_900 },
    statsDate: { ...typography.body_small, color: colors.gray_600 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
    statBox: { flex: 1, minWidth: '45%', backgroundColor: colors.gray_50, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center' },
    statIcon: { marginBottom: spacing.sm },
    statValue: { ...typography.h3, color: colors.gray_900, marginBottom: spacing.xs },
    statLabel: { ...typography.caption, color: colors.gray_600, textAlign: 'center' },
    statChange: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: borderRadius.sm, marginTop: spacing.xs },
    statChangeText: { ...typography.caption, fontSize: 10, fontWeight: '600' },
    pendingAlert: { backgroundColor: colors.error_light, margin: spacing.base, marginTop: 0, borderRadius: borderRadius.xl, padding: spacing.base, borderWidth: 1, borderColor: colors.error },
    pendingHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
    pendingIconContainer: { width: 40, height: 40, borderRadius: borderRadius.lg, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
    pendingInfo: { flex: 1 },
    pendingTitle: { ...typography.label_medium, color: colors.error, marginBottom: 2 },
    pendingSubtitle: { ...typography.caption, color: colors.error },
    recentOrdersCard: { backgroundColor: colors.white, margin: spacing.base, marginTop: 0, borderRadius: borderRadius.xl, padding: spacing.base, ...shadows.card },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.base },
    sectionTitle: { ...typography.label_medium, color: colors.gray_900 },
    viewAllLink: { ...typography.label_small, color: colors.zomato_red },
    orderCard: { backgroundColor: colors.gray_50, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.sm },
    orderCardCompact: { padding: spacing.sm },
    orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
    orderId: { ...typography.label_small, color: colors.gray_900, fontWeight: '600' },
    orderCustomer: { ...typography.body_small, color: colors.gray_600, marginBottom: spacing.xs },
    orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderItems: { ...typography.caption, color: colors.gray_600 },
    orderAmount: { ...typography.label_small, color: colors.gray_900, fontWeight: '600' },
    quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, paddingHorizontal: spacing.base },
    quickActionCard: { flex: 1, minWidth: '45%', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.base, alignItems: 'center', ...shadows.sm },
    quickActionIcon: { width: 56, height: 56, borderRadius: borderRadius.xl, backgroundColor: colors.gray_50, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
    quickActionTitle: { ...typography.label_small, color: colors.gray_900, marginBottom: spacing.xs, textAlign: 'center' },
    quickActionSubtitle: { ...typography.caption, color: colors.gray_600, textAlign: 'center' },
    tabSpacing: { height: 80 },
    orderStatusText: { ...typography.caption, fontWeight: '700' },
});

export default DashboardScreen;

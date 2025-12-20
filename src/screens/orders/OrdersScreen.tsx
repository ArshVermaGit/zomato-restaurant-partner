import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Search, X, ChefHat } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../store';
import { setOrders, updateOrderStatus, setFilterStatus, setLoading } from '../../store/slices/orderSlice';
import { RestaurantService } from '../../services/api/restaurant';
import OrderCard from '../../components/orders/OrderCard';
import PrepTimeModal from '../../components/orders/PrepTimeModal';
import RejectReasonModal from '../../components/orders/RejectReasonModal';
import { Order } from '../../store/slices/dashboardSlice';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';


const TABS = [
    { id: 'PENDING', label: 'Pending' },
    { id: 'PREPARING', label: 'Preparing' },
    { id: 'READY_FOR_PICKUP', label: 'Ready' },
    { id: 'COMPLETED', label: 'Completed' },
];

const OrdersScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const { orders, filterStatus, loading } = useSelector((state: RootState) => state.orders);
    const pendingOrdersCount = Object.values(orders).filter((o: any) => o.status === 'PENDING').length;

    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [showPrepModal, setShowPrepModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const loadOrders = React.useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const data = await RestaurantService.getAllOrders('REST-001');
            dispatch(setOrders(data));
        } catch (_) {
            console.error(_);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const filterData = React.useCallback(() => {
        let result = Object.values(orders).sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        if (filterStatus !== 'ALL') {
            if (filterStatus === 'COMPLETED') {
                result = result.filter((o: any) => o.status === 'DELIVERED' || o.status === 'CANCELLED');
            } else {
                result = result.filter((o: any) => o.status === filterStatus);
            }
        }

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter((o: any) =>
                o.id.toLowerCase().includes(lowerQuery) ||
                o.customerName.toLowerCase().includes(lowerQuery)
            );
        }

        setFilteredOrders(result);
    }, [orders, filterStatus, searchQuery]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    useEffect(() => {
        filterData();
    }, [filterData]);

    const handleAction = (orderId: string, action: string) => {
        setSelectedOrder(orderId);
        if (action === 'ACCEPT') {
            setShowPrepModal(true);
        } else if (action === 'REJECT') {
            setShowRejectModal(true);
        } else if (action === 'MARK_READY') {
            confirmStatusUpdate(orderId, 'READY_FOR_PICKUP');
        }
    };

    const confirmStatusUpdate = async (orderId: string, status: string) => {
        try {
            // Optimistic Update
            dispatch(updateOrderStatus({ id: orderId, status: status as any }));

            // Close Modals
            setShowPrepModal(false);
            setShowRejectModal(false);
            setSelectedOrder(null);

            // API Call (simulated)
            await RestaurantService.updateOrder(orderId, status);
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.title}>Orders</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('KitchenDisplay')}
                        style={styles.kdsButton}
                    >
                        <ChefHat size={20} color={colors.zomato_red} style={styles.kdsIcon} />
                        <Text style={styles.kdsText}>Kitchen View</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Search size={20} color={colors.gray_500} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Order ID or Name"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={colors.gray_400}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <X size={18} color={colors.gray_500} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
                    {TABS.map(tab => (
                        <TouchableOpacity
                            key={tab.id}
                            style={[styles.tab, filterStatus === tab.id && styles.activeTab]}
                            onPress={() => dispatch(setFilterStatus(tab.id))}
                        >
                            <Text style={[styles.tabText, filterStatus === tab.id && styles.activeTabText]}>
                                {tab.label}
                            </Text>
                            {tab.id === 'PENDING' && pendingOrdersCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{pendingOrdersCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.zomato_red} />
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    renderItem={({ item }) => (
                        <OrderCard
                            order={item}
                            onPress={() => navigation.navigate('RestaurantOrderDetail', { orderId: item.id })}
                            onAction={(action) => handleAction(item.id, action)}
                        />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No orders found</Text>
                        </View>
                    }
                />
            )}

            {/* Modals */}
            <PrepTimeModal
                visible={showPrepModal}
                onClose={() => setShowPrepModal(false)}
                onConfirm={() => selectedOrder && confirmStatusUpdate(selectedOrder, 'PREPARING')}
            />

            <RejectReasonModal
                visible={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onConfirm={() => selectedOrder && confirmStatusUpdate(selectedOrder, 'CANCELLED')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray_50,
    },
    header: {
        backgroundColor: colors.white,
        padding: spacing.base,
        paddingBottom: spacing.sm,
        ...shadows.sm,
        zIndex: 1,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        ...typography.h1,
        color: colors.gray_900,
    },
    kdsButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray_50,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        height: 44,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        ...typography.body_medium,
        color: colors.gray_900,
    },
    tabsContainer: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_200,
    },
    tabsContent: {
        paddingHorizontal: spacing.sm,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.base,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: colors.zomato_red,
    },
    tabText: {
        ...typography.label_medium,
        color: colors.gray_600,
    },
    activeTabText: {
        color: colors.zomato_red,
        fontWeight: '700',
    },
    badge: {
        backgroundColor: colors.zomato_red,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: spacing.xs,
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    list: {
        padding: spacing.base,
        paddingBottom: spacing.xl,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        ...typography.body_large,
        color: colors.gray_500,
    },
    kdsIcon: {
        marginRight: 8,
    },
    kdsText: {
        color: colors.zomato_red,
        fontWeight: '600',
    }
});

export default OrdersScreen;

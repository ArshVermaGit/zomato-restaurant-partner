import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Search, Filter, X } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setOrders, updateOrderStatus, setFilterStatus, setLoading } from '../../store/slices/orderSlice';
import { RestaurantService } from '../../services/api/restaurant';
import OrderCard from '../../components/orders/OrderCard';
import { Order } from '../../store/slices/dashboardSlice';

const TABS = [
    { id: 'PENDING', label: 'Pending' },
    { id: 'PREPARING', label: 'Preparing' },
    { id: 'READY_FOR_PICKUP', label: 'Ready' },
    { id: 'COMPLETED', label: 'Completed' },
];

const OrdersScreen = () => {
    const dispatch = useDispatch();
    const { orders, filterStatus, loading } = useSelector((state: RootState) => state.orders);
    const pendingOrdersCount = Object.values(orders).filter(o => o.status === 'PENDING').length;

    // Convert orders object to array and sort by date descending
    const ordersList = Object.values(orders).sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        filterData();
    }, [orders, filterStatus, searchQuery]);

    const loadOrders = async () => {
        dispatch(setLoading(true));
        try {
            const data = await RestaurantService.getAllOrders('REST-001'); // Replace with actual ID
            dispatch(setOrders(data));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const filterData = () => {
        let result = ordersList;

        // Status Filter
        if (filterStatus !== 'ALL') {
            // Mapping 'COMPLETED' to show both DELIVERED and CANCELLED for history
            if (filterStatus === 'COMPLETED') {
                result = result.filter(o => o.status === 'DELIVERED' || o.status === 'CANCELLED');
            } else {
                result = result.filter(o => o.status === filterStatus);
            }
        }

        // Search Filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(o =>
                o.id.toLowerCase().includes(lowerQuery) ||
                o.customerName.toLowerCase().includes(lowerQuery)
            );
        }

        setFilteredOrders(result);
    };

    const handleAction = async (orderId: string, action: string) => {
        try {
            let newStatus;
            if (action === 'ACCEPT') newStatus = 'PREPARING';
            else if (action === 'REJECT') newStatus = 'CANCELLED';
            else if (action === 'MARK_READY') newStatus = 'READY_FOR_PICKUP';
            else return;

            // Optimistic Update
            dispatch(updateOrderStatus({ id: orderId, status: newStatus as any }));

            // API Call
            await RestaurantService.updateOrder(orderId, newStatus);
        } catch (error) {
            console.error('Action failed', error);
            // Ideally revert status here
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Orders</Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Order ID or Name"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <X size={18} color="#666" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Tabs */}
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

            {/* List */}
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#E23744" />
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    renderItem={({ item }) => (
                        <OrderCard
                            order={item}
                            onPress={() => { }} // TODO: Navigate to Detail
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#FFF',
        padding: 16,
        paddingBottom: 12,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginBottom: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    tabsContainer: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    tabsContent: {
        paddingHorizontal: 12,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#E23744',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: '#E23744',
    },
    badge: {
        backgroundColor: '#E23744',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 6,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    list: {
        padding: 16,
        paddingBottom: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
    }
});

export default OrdersScreen;

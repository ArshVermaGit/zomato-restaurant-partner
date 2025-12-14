import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { RestaurantService } from '../../services/api/restaurant';
import KitchenOrderCard from '../../components/orders/KitchenOrderCard';
import { updateOrderStatus } from '../../store/slices/orderSlice';

const KitchenDisplayScreen = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.orders.orders);

    // Filter active kitchen orders
    const preparingOrders = Object.values(orders).filter(o => o.status === 'PREPARING' || o.status === 'PENDING').sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() // Oldest first
    );

    const handleReady = async (orderId: string) => {
        try {
            dispatch(updateOrderStatus({ id: orderId, status: 'READY_FOR_PICKUP' }));
            await RestaurantService.updateOrder(orderId, 'READY_FOR_PICKUP');
        } catch (error) {
            console.error('Failed to mark ready', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Kitchen Display System</Text>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Active Orders:</Text>
                    <Text style={styles.statValue}>{preparingOrders.length}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.grid}>
                {/* CSS Grid simulated with flex-wrap */}
                <View style={styles.row}>
                    {preparingOrders.map(order => (
                        <View key={order.id} style={styles.gridItem}>
                            <KitchenOrderCard order={order} onReady={() => handleReady(order.id)} />
                        </View>
                    ))}
                    {preparingOrders.length === 0 && (
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}>No Active Orders</Text>
                            <Text style={styles.subText}>Orders marked "Preparing" will appear here</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222', // Dark mode for kitchen
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statLabel: {
        color: '#AAA',
        fontSize: 16,
    },
    statValue: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    grid: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    gridItem: {
        width: '47%', // 2 columns approx
        marginBottom: 8,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        width: '100%',
    },
    emptyText: {
        color: '#666',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subText: {
        color: '#444',
        fontSize: 16,
    }
});

export default KitchenDisplayScreen;

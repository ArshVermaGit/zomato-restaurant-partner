import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { RestaurantService } from '../../services/api/restaurant';
import KitchenOrderCard from '../../components/orders/KitchenOrderCard';
import { updateOrderStatus } from '../../store/slices/orderSlice';
import { colors, typography, spacing } from '../../theme';
import { ChefHat, Grid } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const KitchenDisplayScreen = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.orders.orders);

    // Filter active kitchen orders (Preparing or Pending)
    const activeOrders = Object.values(orders)
        .filter((o: any) => o.status === 'PREPARING' || o.status === 'PENDING')
        .sort((a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() // Oldest first
        );

    const handleReady = async (orderId: string) => {
        try {
            dispatch(updateOrderStatus({ id: orderId, status: 'READY_FOR_PICKUP' as any }));
            await RestaurantService.updateOrder(orderId, 'READY_FOR_PICKUP');
        } catch (error) {
            console.error('Failed to mark ready', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                    <ChefHat size={32} color={colors.white} style={styles.headerIcon} />
                    <Text style={styles.title}>Kitchen Display System</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Active Orders</Text>
                        <Text style={styles.statValue}>{activeOrders.length}</Text>
                    </View>
                    <View style={[styles.statBox, styles.statBoxAlert]}>
                        <Text style={[styles.statLabel, { color: colors.warning_light }]}>Delayed</Text>
                        {/* Mock delayed count */}
                        <Text style={[styles.statValue, { color: colors.warning }]}>
                            {activeOrders.filter((o: any) =>
                                (Date.now() - new Date(o.createdAt).getTime()) > 15 * 60000
                            ).length}
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.grid}>
                    {activeOrders.map((order: any) => (
                        <View key={order.id} style={styles.gridItem}>
                            <KitchenOrderCard order={order} onReady={() => handleReady(order.id)} />
                        </View>
                    ))}
                    {activeOrders.length === 0 && (
                        <View style={styles.emptyState}>
                            <Grid size={64} color={colors.gray_700} />
                            <Text style={styles.emptyText}>All Caught Up!</Text>
                            <Text style={styles.emptySubtext}>No active orders in the kitchen.</Text>
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
        backgroundColor: '#1E1E1E', // Dark KDS theme
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: '#2C2C2C',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    headerIcon: {
        opacity: 0.9,
    },
    title: {
        ...typography.h2,
        color: colors.white,
        letterSpacing: 0.5,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: spacing.lg,
    },
    statBox: {
        alignItems: 'center',
    },
    statBoxAlert: {
        borderLeftWidth: 1,
        borderLeftColor: '#444',
        paddingLeft: spacing.lg,
    },
    statLabel: {
        ...typography.caption,
        color: colors.gray_400,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statValue: {
        ...typography.h2,
        color: colors.success,
        fontVariant: ['tabular-nums'],
    },
    scrollContent: {
        padding: spacing.lg,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.lg,
    },
    gridItem: {
        // approx 3 columns on tablet, 2 on large phone, 1 on small phone
        width: width > 900 ? '32%' : width > 600 ? '48%' : '100%',
        minWidth: 300,
    },
    emptyState: {
        width: '100%',
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
    },
    emptyText: {
        ...typography.h2,
        color: colors.gray_500,
    },
    emptySubtext: {
        ...typography.body_large,
        color: colors.gray_600,
    }
});

export default KitchenDisplayScreen;

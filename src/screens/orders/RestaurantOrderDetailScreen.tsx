import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@zomato/ui';
import { OrderHeaderCard } from '../../components/orders/OrderHeaderCard';
import { CustomerCard } from '../../components/orders/CustomerCard';
import { ItemsList } from '../../components/orders/ItemsList';
import { InstructionsCard } from '../../components/orders/InstructionsCard';
import { PaymentCard } from '../../components/orders/PaymentCard';
import { ActionButtons } from '../../components/orders/ActionButtons';
import { fetchOrderDetails, updateOrderStatus, clearCurrentOrder } from '../../store/slices/dashboardSlice';
import { AppDispatch, RootState } from '../../store';

export const RestaurantOrderDetailScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const dispatch = useDispatch<AppDispatch>();
    const { orderId } = route.params || {};

    const { currentOrder, loading, error } = useSelector((state: RootState) => state.dashboard);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderDetails(orderId));
        }
        return () => {
            dispatch(clearCurrentOrder());
        };
    }, [dispatch, orderId]);

    const handleAccept = async () => {
        try {
            await dispatch(updateOrderStatus({ orderId, status: 'ACCEPTED' })).unwrap();
            Alert.alert('Success', 'Order Accepted');
            dispatch(fetchOrderDetails(orderId)); // Refresh
        } catch (err) {
            console.error('Accept error:', err);
            Alert.alert('Error', 'Failed to accept order');
        }
    };

    const handleReject = async () => {
        try {
            await dispatch(updateOrderStatus({ orderId, status: 'REJECTED' })).unwrap();
            Alert.alert('Success', 'Order Rejected');
            navigation.goBack();
        } catch (err) {
            console.error('Reject error:', err);
            Alert.alert('Error', 'Failed to reject order');
        }
    };

    const handleMarkReady = async () => {
        try {
            await dispatch(updateOrderStatus({ orderId, status: 'READY' })).unwrap();
            Alert.alert('Success', 'Order Marked as Ready');
            dispatch(fetchOrderDetails(orderId));
        } catch (err) {
            console.error('Update status error:', err);
            Alert.alert('Error', 'Failed to update status');
        }
    };

    const handleVerifyPickup = () => {
        // For now just refresh or show info, as actual pickup is done by delivery partner
        dispatch(fetchOrderDetails(orderId));
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#E23744" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Failed to load order: {error}</Text>
                <Button variant="primary" onPress={() => dispatch(fetchOrderDetails(orderId))}>Retry</Button>
            </View>
        );
    }

    if (!currentOrder) {
        return (
            <View style={styles.center}>
                <Text>Order not found</Text>
            </View>
        );
    }

    // Normalize status for comparison
    const status = currentOrder.status.toLowerCase();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <OrderHeaderCard
                    orderId={currentOrder.id}
                    status={status}
                    time={currentOrder.createdAt}
                />

                <CustomerCard
                    name={currentOrder.customerName}
                    phone={currentOrder.customerPhone}
                    address={currentOrder.deliveryAddress}
                />

                <ItemsList items={currentOrder.items} />

                {currentOrder.instructions && (
                    <InstructionsCard text={currentOrder.instructions} />
                )}

                <PaymentCard
                    method={currentOrder.paymentMethod || 'COD'}
                    amount={currentOrder.amount}
                    breakdown={currentOrder.breakdown}
                />

                {status === 'preparing' && (
                    <View style={styles.section}>
                        <Button
                            variant="primary"
                            onPress={handleMarkReady}
                        >
                            Mark as Ready
                        </Button>
                    </View>
                )}

                {status === 'ready_for_pickup' && (
                    <View style={styles.section}>
                        {currentOrder.pickupOTP && (
                            <View style={styles.otpContainer}>
                                <Text style={styles.otpLabel}>Pickup OTP</Text>
                                <Text style={styles.otpValue}>{currentOrder.pickupOTP}</Text>
                            </View>
                        )}
                        <Text style={styles.infoText}>Waiting for delivery partner...</Text>
                        <Button
                            variant="secondary"
                            onPress={handleVerifyPickup}
                        >
                            Refresh Status
                        </Button>
                    </View>
                )}
            </ScrollView>

            {status === 'pending' && (
                <ActionButtons
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    errorText: {
        color: '#D32F2F',
        fontSize: 16,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    section: {
        padding: 16,
        backgroundColor: '#FFF',
        marginTop: 8,
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    otpLabel: {
        fontSize: 16,
        color: '#666',
    },
    otpValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1C',
        letterSpacing: 4,
    },
    infoText: {
        textAlign: 'center',
        marginBottom: 12,
        color: '#666'
    }
});

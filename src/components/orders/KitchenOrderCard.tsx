import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '../../store/slices/dashboardSlice';

interface Props {
    order: Order;
    onReady: () => void;
}

const KitchenOrderCard: React.FC<Props> = ({ order, onReady }) => {
    // Determine color based on elapsed time (mock logic)
    const elapsedMins = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
    let borderColor = '#4CAF50'; // Green (< 10m)
    if (elapsedMins > 20) borderColor = '#D32F2F'; // Red (> 20m)
    else if (elapsedMins > 10) borderColor = '#FF9800'; // Orange (> 10m)

    return (
        <View style={[styles.card, { borderColor }]}>
            <View style={[styles.header, { backgroundColor: borderColor }]}>
                <Text style={styles.headerText}>#{order.id.split('-')[1]}</Text>
                <Text style={styles.headerText}>{elapsedMins}m</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.items}>
                    {order.items.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <Text style={styles.qty}>{item.quantity}</Text>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.btn} onPress={onReady}>
                <Text style={styles.btnText}>MARK READY</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 2,
        overflow: 'hidden',
        minHeight: 200,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
    },
    headerText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    content: {
        padding: 12,
        flex: 1,
    },
    items: {
        gap: 8,
    },
    itemRow: {
        flexDirection: 'row',
        gap: 12,
    },
    qty: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
        width: 24,
    },
    itemName: {
        fontSize: 18,
        color: '#333',
        flex: 1,
    },
    btn: {
        backgroundColor: '#F0F0F0',
        padding: 16,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    btnText: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 14,
    }
});

export default KitchenOrderCard;

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
        backgroundColor: '#333', // Dark card
        borderRadius: 12,
        borderWidth: 2,
        overflow: 'hidden',
        minHeight: 240,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 16,
    },
    headerText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 20,
        letterSpacing: 0.5,
    },
    content: {
        padding: 16,
        flex: 1,
    },
    items: {
        gap: 12,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
    },
    qty: {
        fontSize: 20,
        fontWeight: '800',
        color: '#FFF',
        width: 32,
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 6,
        overflow: 'hidden',
    },
    itemName: {
        fontSize: 17,
        fontWeight: '500',
        color: '#E0E0E0',
        flex: 1,
        lineHeight: 24,
    },
    btn: {
        backgroundColor: '#444',
        padding: 16,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#555',
    },
    btnText: {
        fontWeight: '700',
        color: '#FFF', // Default, will be overridden by header color usually if matched
        fontSize: 16,
        letterSpacing: 1,
    }
});

export default KitchenOrderCard;

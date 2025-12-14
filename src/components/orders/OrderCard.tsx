import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, User } from 'lucide-react-native';
import { Order } from '../../store/slices/dashboardSlice';

interface Props {
    order: Order;
    onPress: () => void;
    onAction: (action: string) => void; // 'ACCEPT', 'REJECT', 'MARK_READY'
}

const OrderCard: React.FC<Props> = ({ order, onPress, onAction }) => {
    const timeAgo = (dateString: string) => {
        const diff = Date.now() - new Date(dateString).getTime();
        const mins = Math.floor(diff / 60000);
        return `${mins} mins ago`;
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.orderId}>#{order.id.split('-')[1]}</Text>
                <View style={styles.timeTag}>
                    <Clock size={12} color="#666" />
                    <Text style={styles.timeText}>{timeAgo(order.createdAt)}</Text>
                </View>
            </View>

            <View style={styles.customerRow}>
                <User size={16} color="#666" />
                <Text style={styles.customerName}>{order.customerName}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.itemsList}>
                {order.items.map((item, idx) => (
                    <Text key={idx} style={styles.itemText} numberOfLines={1}>
                        {item.quantity} x {item.name}
                    </Text>
                ))}
            </View>

            <View style={styles.footer}>
                <Text style={styles.amount}>₹{order.amount}</Text>

                {order.status === 'PENDING' && (
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.rejectBtn} onPress={() => onAction('REJECT')}>
                            <Text style={styles.rejectText}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptBtn} onPress={() => onAction('ACCEPT')}>
                            <Text style={styles.acceptText}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {order.status === 'PREPARING' && (
                    <TouchableOpacity style={styles.readyBtn} onPress={() => onAction('MARK_READY')}>
                        <Text style={styles.readyText}>Mark Ready</Text>
                    </TouchableOpacity>
                )}

                {/* Other statuses just show label */}
                {(order.status === 'READY_FOR_PICKUP' || order.status === 'DELIVERED') && (
                    <View style={styles.statusLabel}>
                        <Text style={styles.statusText}>{order.status.replace(/_/g, ' ')}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    timeTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: 12,
        color: '#666',
    },
    customerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    customerName: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 12,
    },
    itemsList: {
        marginBottom: 16,
        gap: 4,
    },
    itemText: {
        fontSize: 14,
        color: '#444',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    rejectBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D32F2F',
    },
    rejectText: {
        color: '#D32F2F',
        fontWeight: '600',
        fontSize: 12,
    },
    acceptBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
    },
    acceptText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 12,
    },
    readyBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#FF9800',
    },
    readyText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 12,
    },
    statusLabel: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    }
});

export default OrderCard;

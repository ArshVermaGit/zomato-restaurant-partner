import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Timer, X } from 'lucide-react-native';
import { Order } from '../../store/slices/dashboardSlice';

interface Props {
    orders: Order[];
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}

const PendingOrders: React.FC<Props> = ({ orders, onAccept, onReject }) => {
    if (orders.length === 0) return null;

    const renderItem = ({ item }: { item: Order }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.orderId}>#{item.id.split('-')[1]}</Text>
                <View style={styles.timer}>
                    <Timer size={14} color="#D32F2F" />
                    <Text style={styles.timerText}>04:59</Text>
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.customer}>{item.customerName}</Text>
                <Text style={styles.items} numberOfLines={1}>
                    {item.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </Text>
                <Text style={styles.amount}>₹{item.amount}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.rejectBtn} onPress={() => onReject(item.id)}>
                    <X size={20} color="#D32F2F" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptBtn} onPress={() => onAccept(item.id)}>
                    <Text style={styles.acceptText}>Accept Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <Text style={styles.title}>Pending Orders</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{orders.length}</Text>
                </View>
            </View>
            <FlatList
                data={orders}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginRight: 8,
    },
    badge: {
        backgroundColor: '#E23744',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 16,
        gap: 12,
    },
    card: {
        width: 280,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E23744',
        elevation: 2,
        shadowColor: '#E23744',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    timer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    timerText: {
        color: '#D32F2F',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    details: {
        marginBottom: 16,
    },
    customer: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    items: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptBtn: {
        flex: 1,
        height: 40,
        backgroundColor: '#E23744',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});

export default PendingOrders;

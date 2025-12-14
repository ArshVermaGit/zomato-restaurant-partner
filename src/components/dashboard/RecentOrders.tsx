import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Order } from '../../store/slices/dashboardSlice';

interface Props {
    orders: Order[];
}

const RecentOrders: React.FC<Props> = ({ orders }) => {
    const renderItem = ({ item }: { item: Order }) => (
        <TouchableOpacity style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.statusDot} />
                <View>
                    <Text style={styles.orderId}>#{item.id.split('-')[1]} • {item.customerName}</Text>
                    <Text style={styles.details}>{item.items.length} items • ₹{item.amount}</Text>
                </View>
            </View>
            <View style={styles.itemRight}>
                <View style={[styles.badge, styles.deliveredBadge]}>
                    <Text style={styles.badgeText}>{item.status}</Text>
                </View>
                <ChevronRight size={16} color="#999" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recent Orders</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={orders}
                renderItem={renderItem}
                scrollEnabled={false}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    viewAll: {
        color: '#E23744',
        fontSize: 14,
        fontWeight: '600',
    },
    list: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 8,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 12,
    },
    orderId: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1C',
        marginBottom: 2,
    },
    details: {
        fontSize: 12,
        color: '#666',
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    deliveredBadge: {
        backgroundColor: '#E8F5E9',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#2E7D32',
    }
});

export default RecentOrders;

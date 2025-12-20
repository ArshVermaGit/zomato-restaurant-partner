import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';

interface OrderHeaderCardProps {
    orderId: string;
    status: string;
    time: string;
}

export const OrderHeaderCard: React.FC<OrderHeaderCardProps> = ({ orderId, status, time }) => {
    const timeAgo = (dateString: string) => {
        try {
            const diff = Date.now() - new Date(dateString).getTime();
            const mins = Math.floor(diff / 60000);
            return `${mins} mins ago`;
        } catch (error) {
            console.warn('Error calculating time ago:', error);
            return dateString;
        }
    };

    const formattedId = orderId.includes('-') ? orderId.split('-')[1] : orderId;

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.orderId}>Order #{formattedId}</Text>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{status.replace(/_/g, ' ')}</Text>
                </View>
            </View>
            <View style={styles.timeRow}>
                <Clock size={14} color="#666" />
                <Text style={styles.timeText}>Placed {timeAgo(time)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 16,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    statusBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statusText: {
        color: '#2E7D32',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
});

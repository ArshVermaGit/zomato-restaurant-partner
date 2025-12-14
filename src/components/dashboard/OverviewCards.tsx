import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IndianRupee, ShoppingBag, CheckCircle, Clock } from 'lucide-react-native';

interface Props {
    stats: {
        revenue: number;
        totalOrders: number;
        completedOrders: number;
        avgPrepTime: number;
    }
}

const OverviewCards: React.FC<Props> = ({ stats }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={[styles.card, styles.highlightCard]}>
                    <View style={styles.iconBg}>
                        <IndianRupee size={20} color="#2E7D32" />
                    </View>
                    <Text style={styles.value}>₹{stats.revenue.toLocaleString()}</Text>
                    <Text style={styles.label}>Today's Revenue</Text>
                </View>
                <View style={styles.card}>
                    <ShoppingBag size={20} color="#1976D2" style={styles.icon} />
                    <Text style={styles.value}>{stats.totalOrders}</Text>
                    <Text style={styles.label}>Total Orders</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.card}>
                    <CheckCircle size={20} color="#4CAF50" style={styles.icon} />
                    <Text style={styles.value}>{stats.completedOrders}</Text>
                    <Text style={styles.label}>Delivered</Text>
                </View>
                <View style={styles.card}>
                    <Clock size={20} color="#F57C00" style={styles.icon} />
                    <Text style={styles.value}>{stats.avgPrepTime}m</Text>
                    <Text style={styles.label}>Avg Prep Time</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 12,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    highlightCard: {
        backgroundColor: '#E8F5E9',
    },
    icon: {
        marginBottom: 8,
    },
    iconBg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    label: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    }
});

export default OverviewCards;

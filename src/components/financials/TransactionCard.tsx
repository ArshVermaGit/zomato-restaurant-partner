import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../../store/slices/financialsSlice';

interface Props {
    transaction: Transaction;
}

const TransactionCard: React.FC<Props> = ({ transaction }) => {
    const isPending = transaction.status === 'PENDING';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.orderId}>{transaction.orderId}</Text>
                    <Text style={styles.date}>{new Date(transaction.date).toLocaleString()}</Text>
                </View>
                <View style={[styles.statusBadge, isPending ? styles.statusPending : styles.statusPaid]}>
                    <Text style={[styles.statusText, isPending ? styles.textPending : styles.textPaid]}>
                        {transaction.status}
                    </Text>
                </View>
            </View>

            <View style={styles.details}>
                <View style={styles.row}>
                    <Text style={styles.label}>Order Amount</Text>
                    <Text style={styles.value}>₹{transaction.amount}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Zomato Fee (20%)</Text>
                    <Text style={styles.valueRed}>- ₹{transaction.commission}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Taxes</Text>
                    <Text style={styles.valueRed}>- ₹{transaction.tax}</Text>
                </View>
                <View style={[styles.row, styles.netRow]}>
                    <Text style={styles.netLabel}>Net Payout</Text>
                    <Text style={styles.netValue}>₹{transaction.netAmount}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statusPaid: {
        backgroundColor: '#E8F5E9',
    },
    statusPending: {
        backgroundColor: '#FFF3E0',
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    textPaid: {
        color: '#2E7D32',
    },
    textPending: {
        color: '#EF6C00',
    },
    details: {
        gap: 6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 13,
        color: '#666',
    },
    value: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    },
    valueRed: {
        fontSize: 13,
        color: '#D32F2F',
    },
    netRow: {
        marginTop: 6,
        paddingTop: 6,
        borderTopWidth: 1,
        borderTopColor: '#FAFAFA',
    },
    netLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    netValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2E7D32',
    }
});

export default TransactionCard;

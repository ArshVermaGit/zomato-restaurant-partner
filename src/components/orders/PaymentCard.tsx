import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CreditCard, Banknote } from 'lucide-react-native';

interface PaymentCardProps {
    method: string;
    amount: number;
    breakdown?: {
        itemTotal: number;
        taxes: number;
        deliveryCharge?: number;
        discount?: number;
    };
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ method, amount, breakdown }) => {
    const isCash = method.toLowerCase().includes('cash');

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Payment Details</Text>

            <View style={styles.methodRow}>
                {isCash ? (
                    <Banknote size={20} color="#666" />
                ) : (
                    <CreditCard size={20} color="#666" />
                )}
                <Text style={styles.methodText}>{method}</Text>
                <Text style={styles.totalAmount}>₹{amount}</Text>
            </View>

            {breakdown && (
                <View style={styles.breakdown}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Item Total</Text>
                        <Text style={styles.value}>₹{breakdown.itemTotal}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Taxes & Charges</Text>
                        <Text style={styles.value}>₹{breakdown.taxes}</Text>
                    </View>
                    {breakdown.deliveryCharge && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Delivery Partner Fee</Text>
                            <Text style={styles.value}>₹{breakdown.deliveryCharge}</Text>
                        </View>
                    )}
                    {breakdown.discount && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Discount</Text>
                            <Text style={[styles.value, styles.discount]}>-₹{breakdown.discount}</Text>
                        </View>
                    )}
                    <View style={[styles.row, styles.grandTotal]}>
                        <Text style={styles.totalLabel}>Grand Total</Text>
                        <Text style={styles.totalValue}>₹{amount}</Text>
                    </View>
                </View>
            )}
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
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    methodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
    },
    methodText: {
        fontSize: 15,
        color: '#1C1C1C',
        fontWeight: '500',
        marginLeft: 12,
        flex: 1,
        textTransform: 'capitalize',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    breakdown: {
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    value: {
        fontSize: 14,
        color: '#1C1C1C',
    },
    discount: {
        color: '#4CAF50',
    },
    grandTotal: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    totalValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
});

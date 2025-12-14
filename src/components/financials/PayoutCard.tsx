import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Payout } from '../../store/slices/financialsSlice';
import { CheckCircle, Clock } from 'lucide-react-native';

interface Props {
    payout: Payout;
}

const PayoutCard: React.FC<Props> = ({ payout }) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                {payout.status === 'PROCESSED' ? (
                    <CheckCircle size={24} color="#4CAF50" />
                ) : (
                    <Clock size={24} color="#FFA000" />
                )}
            </View>
            <View style={styles.center}>
                <Text style={styles.amount}>₹{payout.amount.toLocaleString()}</Text>
                <Text style={styles.date}>Settled on {new Date(payout.date).toDateString()}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.refId}>Ref: {payout.transactionRef}</Text>
                <Text style={styles.status}>{payout.status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    left: {
        marginRight: 16,
    },
    center: {
        flex: 1,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    right: {
        alignItems: 'flex-end',
    },
    refId: {
        fontSize: 10,
        color: '#999',
        marginBottom: 4,
    },
    status: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#4CAF50',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    }
});

export default PayoutCard;

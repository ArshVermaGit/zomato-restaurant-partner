import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

interface Transaction {
    id: string;
    type: 'CREDIT' | 'DEBIT';
    amount: number;
    description: string;
    date: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

interface Props {
    transactions: Transaction[];
    onFilter: () => void;
}

const TransactionsList: React.FC<Props> = ({ transactions, onFilter }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recent Transactions</Text>
                <TouchableOpacity onPress={onFilter}>
                    <Text style={styles.link}>View All</Text>
                </TouchableOpacity>
            </View>

            {transactions.length === 0 ? (
                <Text style={styles.empty}>No recent transactions</Text>
            ) : (
                transactions.map((t) => (
                    <View key={t.id} style={styles.item}>
                        <View style={[styles.icon, t.type === 'CREDIT' ? styles.creditIcon : styles.debitIcon]}>
                            {t.type === 'CREDIT' ? (
                                <ArrowDownLeft size={20} color={colors.success} />
                            ) : (
                                <ArrowUpRight size={20} color={colors.zomato_red} />
                            )}
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.desc}>{t.description}</Text>
                            <Text style={styles.date}>{t.date}</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={[styles.amount, t.type === 'CREDIT' ? styles.creditText : styles.debitText]}>
                                {t.type === 'CREDIT' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString()}
                            </Text>
                            <Text style={[styles.status, { color: getStatusColor(t.status) }]}>
                                {t.status}
                            </Text>
                        </View>
                    </View>
                ))
            )}
        </View>
    );
};

const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
        case 'COMPLETED': return colors.success;
        case 'PENDING': return colors.warning;
        case 'FAILED': return colors.zomato_red;
        default: return colors.gray_500;
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        ...typography.h4,
        color: colors.gray_900,
    },
    link: {
        ...typography.body_small,
        color: colors.zomato_red,
        fontWeight: '600',
    },
    empty: {
        textAlign: 'center',
        color: colors.gray_500,
        padding: spacing.lg,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    creditIcon: {
        backgroundColor: colors.semantic.success_light,
    },
    debitIcon: {
        backgroundColor: colors.semantic.error_light,
    },
    details: {
        flex: 1,
    },
    desc: {
        ...typography.body_medium,
        fontWeight: '600',
        color: colors.gray_900,
    },
    date: {
        ...typography.caption,
        color: colors.gray_500,
    },
    right: {
        alignItems: 'flex-end',
    },
    amount: {
        ...typography.body_medium,
        fontWeight: 'bold',
    },
    creditText: {
        color: colors.success,
    },
    debitText: {
        color: colors.gray_900,
    },
    status: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 2,
    }
});

export default TransactionsList;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react-native';

interface Props {
    today: number;
    week: number;
    month: number;
}

const RevenueCard: React.FC<Props> = ({ today, week, month }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Revenue Overview</Text>
                <TrendingUp size={20} color={colors.success} />
            </View>

            <View style={styles.row}>
                <View style={styles.stat}>
                    <Text style={styles.label}>Today</Text>
                    <Text style={[styles.amount, { color: colors.zomato_red }]}>₹{today.toLocaleString()}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.stat}>
                    <Text style={styles.label}>This Week</Text>
                    <Text style={styles.amount}>₹{week.toLocaleString()}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.stat}>
                    <Text style={styles.label}>This Month</Text>
                    <Text style={styles.amount}>₹{month.toLocaleString()}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.h3,
        color: colors.gray_900,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stat: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        ...typography.caption,
        color: colors.gray_500,
        marginBottom: 4,
    },
    amount: {
        ...typography.h3,
        color: colors.gray_800,
        fontSize: 18,
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: colors.gray_200,
    }
});

export default RevenueCard;

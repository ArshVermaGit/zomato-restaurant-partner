import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Clock } from 'lucide-react-native';
import { Button } from '@zomato/ui';

interface Props {
    amount: number;
    nextPayoutDate: string;
}

const SettlementCard: React.FC<Props> = ({ amount, nextPayoutDate }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.label}>Pending Settlement</Text>
                    <Text style={styles.amount}>₹{amount.toLocaleString()}</Text>
                    <View style={styles.dateRow}>
                        <Clock size={14} color={colors.warning} />
                        <Text style={styles.dateText}>Next Payout: {nextPayoutDate}</Text>
                    </View>
                </View>
                <Button variant="outline" size="small">Details</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white, // Or a very light subtle tint if desired
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: colors.warning,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        ...typography.caption,
        color: colors.gray_600,
        marginBottom: 4,
    },
    amount: {
        ...typography.h2,
        color: colors.gray_900,
        marginBottom: 4,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    dateText: {
        ...typography.caption,
        color: colors.gray_500,
    }
});

export default SettlementCard;

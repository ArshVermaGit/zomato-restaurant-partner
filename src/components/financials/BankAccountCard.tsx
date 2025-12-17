import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Landmark, ShieldCheck } from 'lucide-react-native';

interface Props {
    account: {
        bankName: string;
        accountNumber: string;
        ifsc: string;
        isVerified: boolean;
    } | null;
}

const BankAccountCard: React.FC<Props> = ({ account }) => {
    if (!account) return null;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconRow}>
                    <Landmark size={20} color={colors.gray_700} />
                    <Text style={styles.title}>Linked Bank Account</Text>
                </View>
                {account.isVerified && (
                    <View style={styles.verifiedBadge}>
                        <ShieldCheck size={14} color={colors.success} />
                        <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                )}
            </View>

            <View style={styles.details}>
                <Text style={styles.bankName}>{account.bankName}</Text>
                <Text style={styles.accountNumber}>•••• •••• {account.accountNumber.slice(-4)}</Text>
                <Text style={styles.ifsc}>IFSC: {account.ifsc}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.gray_200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    title: {
        ...typography.body_medium,
        fontWeight: '600',
        color: colors.gray_900,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.semantic.success_light,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    verifiedText: {
        ...typography.caption,
        color: colors.success,
        fontWeight: '600',
    },
    details: {
        paddingLeft: 32, // Indent to align with title text (20 icon + gap)
    },
    bankName: {
        ...typography.body_large,
        fontWeight: 'bold',
        color: colors.gray_800,
        marginBottom: 4,
    },
    accountNumber: {
        ...typography.body_medium,
        color: colors.gray_600,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Monospaced for numbers
        letterSpacing: 2,
        marginBottom: 4,
    },
    ifsc: {
        ...typography.caption,
        color: colors.gray_500,
    }
});
import { Platform } from 'react-native';

export default BankAccountCard;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { LucideIcon } from 'lucide-react-native';

interface Props {
    label: string;
    value: string | number;
    icon?: LucideIcon;
    iconColor?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
}

const MetricCard: React.FC<Props> = ({ label, value, icon: Icon, iconColor, trend, trendValue }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                {Icon && <Icon size={16} color={iconColor || colors.gray_600} />}
                <Text style={styles.label}>{label}</Text>
            </View>
            <Text style={styles.value}>{value}</Text>
            {trend && trendValue && (
                <Text style={[
                    styles.trend,
                    trend === 'up' ? { color: colors.success } :
                        trend === 'down' ? { color: colors.error } : { color: colors.gray_500 }
                ]}>
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        ...shadows.sm,
        minWidth: 140,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    label: {
        ...typography.label_small,
        color: colors.gray_600,
        fontWeight: '600',
    },
    value: {
        ...typography.h3,
        color: colors.gray_900,
    },
    trend: {
        ...typography.caption,
        marginTop: spacing.xs,
        fontWeight: '500',
    }
});

export default MetricCard;

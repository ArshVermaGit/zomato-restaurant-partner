import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerPlaceholder } from '@zomato/ui';
import { spacing, colors, borderRadius } from '../../theme';

export const OrdersLoadingSkeleton = () => {
    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.card}>
                    <View style={styles.header}>
                        <ShimmerPlaceholder width={120} height={20} />
                        <ShimmerPlaceholder width={60} height={24} borderRadius={12} />
                    </View>
                    <View style={styles.content}>
                        <ShimmerPlaceholder width="70%" height={16} style={styles.shimmerMargin} />
                        <ShimmerPlaceholder width="40%" height={16} />
                    </View>
                    <View style={styles.footer}>
                        <ShimmerPlaceholder width={80} height={32} borderRadius={8} />
                        <ShimmerPlaceholder width={80} height={32} borderRadius={8} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
    },
    card: {
        backgroundColor: colors.white,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.gray_200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    content: {
        marginBottom: spacing.md,
    },
    shimmerMargin: {
        marginBottom: spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: spacing.sm,
    }
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Star } from 'lucide-react-native';

interface TopItem {
    id: string;
    name: string;
    orders: number;
    revenue: number;
    rating: number;
}

interface Props {
    items: TopItem[];
}

const TopItemsTable: React.FC<Props> = ({ items }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top Performing Items</Text>
            <View style={styles.list}>
                {items.map((item, index) => (
                    <View key={item.id} style={styles.row}>
                        <View style={styles.rank}>
                            <Text style={styles.rankText}>#{index + 1}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.details}>
                                {item.orders} orders • ₹{item.revenue.toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.rating}>
                            <Star size={12} color={colors.white} fill={colors.white} />
                            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.lg,
    },
    title: {
        ...typography.h4,
        color: colors.gray_900,
        marginBottom: spacing.md,
    },
    list: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    rank: {
        width: 24,
        height: 24,
        backgroundColor: colors.gray_100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    rankText: {
        ...typography.caption,
        fontWeight: 'bold',
        color: colors.gray_600,
    },
    info: {
        flex: 1,
    },
    name: {
        ...typography.body_medium,
        color: colors.gray_900,
        fontWeight: '500',
    },
    details: {
        ...typography.caption,
        color: colors.gray_500,
        marginTop: 2,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.success,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
        gap: 2,
    },
    ratingText: {
        ...typography.caption,
        color: colors.white,
        fontWeight: 'bold',
    }
});

export default TopItemsTable;

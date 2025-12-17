import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Star } from 'lucide-react-native';

interface Props {
    rating: number;
    totalReviews: number;
    distribution: { [key: number]: number }; // e.g. {5: 100, 4: 20...}
}

const RatingOverviewCard: React.FC<Props> = ({ rating, totalReviews, distribution }) => {
    const maxCount = Math.max(...Object.values(distribution));

    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <Text style={styles.rating}>{rating.toFixed(1)}</Text>
                <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                            key={s}
                            size={16}
                            fill={s <= Math.round(rating) ? colors.zomato_red : colors.gray_200}
                            color={s <= Math.round(rating) ? colors.zomato_red : colors.gray_200}
                        />
                    ))}
                </View>
                <Text style={styles.count}>{totalReviews} Reviews</Text>
            </View>
            <View style={styles.right}>
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = distribution[star] || 0;
                    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    return (
                        <View key={star} style={styles.row}>
                            <Text style={styles.starLabel}>{star} ★</Text>
                            <View style={styles.barContainer}>
                                <View style={[styles.bar, { width: `${percentage}%` }]} />
                            </View>
                            <Text style={styles.barCount}>{count}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        alignItems: 'center',
    },
    left: {
        alignItems: 'center',
        paddingRight: spacing.lg,
        borderRightWidth: 1,
        borderRightColor: colors.gray_100,
        marginRight: spacing.lg,
    },
    rating: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.gray_900,
    },
    stars: {
        flexDirection: 'row',
        gap: 2,
        marginVertical: spacing.xs,
    },
    count: {
        ...typography.caption,
        color: colors.gray_500,
    },
    right: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    starLabel: {
        ...typography.caption,
        width: 24,
        color: colors.gray_600,
        fontWeight: '600',
    },
    barContainer: {
        flex: 1,
        height: 6,
        backgroundColor: colors.gray_100,
        borderRadius: 3,
        marginHorizontal: spacing.xs,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: colors.success,
        borderRadius: 3,
    },
    barCount: {
        ...typography.caption,
        width: 30,
        textAlign: 'right',
        color: colors.gray_400,
    }
});

export default RatingOverviewCard;

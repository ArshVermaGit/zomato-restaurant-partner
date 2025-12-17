import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Review } from '../../store/slices/reviewsSlice';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Star } from 'lucide-react-native';
import { Button } from '@zomato/ui';

interface Props {
    review: Review;
    onRespond: (review: Review) => void;
}

const ReviewCard: React.FC<Props> = ({ review, onRespond }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{review.customerName.charAt(0)}</Text>
                    </View>
                    <View>
                        <Text style={styles.name}>{review.customerName}</Text>
                        <Text style={styles.date}>{review.date}</Text>
                    </View>
                </View>
                <View style={styles.rating}>
                    <Text style={styles.ratingText}>{review.rating} ★</Text>
                </View>
            </View>

            <Text style={styles.content}>{review.text}</Text>

            {review.response ? (
                <View style={styles.responseContainer}>
                    <Text style={styles.responseLabel}>Your Response:</Text>
                    <Text style={styles.responseText}>{review.response}</Text>
                </View>
            ) : (
                <View style={styles.actions}>
                    <Button variant="outline" size="small" onPress={() => onRespond(review)}>
                        Respond
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary.zomato_red_tint, // Using tint for lighter bg
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: colors.zomato_red,
        fontWeight: 'bold',
        fontSize: 16,
    },
    name: {
        ...typography.body_medium,
        color: colors.gray_900,
        fontWeight: '600',
    },
    date: {
        ...typography.caption,
        color: colors.gray_500,
    },
    rating: {
        backgroundColor: colors.success,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    ratingText: {
        color: colors.white,
        ...typography.caption,
        fontWeight: 'bold',
    },
    content: {
        ...typography.body_medium,
        color: colors.gray_800,
        marginBottom: spacing.md,
        lineHeight: 20,
    },
    responseContainer: {
        backgroundColor: colors.gray_50,
        padding: spacing.sm,
        borderRadius: borderRadius.md,
        borderLeftWidth: 3,
        borderLeftColor: colors.zomato_red,
    },
    responseLabel: {
        ...typography.caption,
        fontWeight: '600',
        color: colors.gray_700,
        marginBottom: 2,
    },
    responseText: {
        ...typography.body_small,
        color: colors.gray_600,
    },
    actions: {
        alignItems: 'flex-start',
    }
});

export default ReviewCard;

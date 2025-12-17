import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setReviewsData, respondToReview, setLoading, setFilter, Review } from '../../store/slices/reviewsSlice';
import { RestaurantService } from '../../services/api/restaurant';
import { colors, spacing } from '../../theme';

import RatingOverviewCard from '../../components/reviews/RatingOverviewCard';
import FilterChips from '../../components/reviews/FilterChips';
import ReviewCard from '../../components/reviews/ReviewCard';
import RespondToReviewModal from '../../components/reviews/RespondToReviewModal';

const FILTERS = [
    { id: 'ALL', label: 'All Reviews' },
    { id: '5', label: '5 ★' },
    { id: '4', label: '4 ★' },
    { id: '3', label: '3 ★' },
    { id: '2', label: '2 ★' },
    { id: '1', label: '1 ★' },
    { id: 'PHOTOS', label: 'With Photos' },
];

const ReviewsScreen = () => {
    const dispatch = useDispatch();
    const { filteredReviews, stats, filter, loading } = useSelector((state: RootState) => state.reviews);

    // Response Modal State
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [isResponseModalVisible, setIsResponseModalVisible] = useState(false);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        dispatch(setLoading(true));
        try {
            const data = await RestaurantService.getReviews('REST-001');
            dispatch(setReviewsData(data));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleOpenResponse = (review: Review) => {
        setSelectedReview(review);
        setIsResponseModalVisible(true);
    };

    const handleSubmitResponse = async (text: string) => {
        if (selectedReview) {
            dispatch(respondToReview({ id: selectedReview.id, response: text }));
            await RestaurantService.respondToReview(selectedReview.id, text);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Customer Reviews</Text>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.zomato_red} />
                </View>
            ) : (
                <FlatList
                    data={filteredReviews}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={
                        <View>
                            <RatingOverviewCard
                                rating={stats.average}
                                totalReviews={stats.totalCount}
                                distribution={stats.distribution}
                            />
                            <FilterChips
                                options={FILTERS}
                                selected={filter}
                                onSelect={(id) => dispatch(setFilter(id as any))}
                            />
                        </View>
                    }
                    renderItem={({ item }) => (
                        <ReviewCard review={item} onRespond={handleOpenResponse} />
                    )}
                    contentContainerStyle={styles.list}
                />
            )}

            <RespondToReviewModal
                visible={isResponseModalVisible}
                review={selectedReview}
                onClose={() => setIsResponseModalVisible(false)}
                onSubmit={handleSubmitResponse}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        padding: spacing.md,
        paddingTop: 50,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.gray_900,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: spacing.md,
    },
});

export default ReviewsScreen;

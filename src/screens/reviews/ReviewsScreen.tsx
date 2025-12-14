import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setReviewsData, respondToReview, setLoading, setFilter } from '../../store/slices/reviewsSlice';
import { RestaurantService } from '../../services/api/restaurant';
import RatingSummary from '../../components/reviews/RatingSummary';
import ReviewCard from '../../components/reviews/ReviewCard';

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

    const handleReply = async (id: string, text: string) => {
        dispatch(respondToReview({ id, response: text }));
        await RestaurantService.respondToReview(id, text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Customer Reviews</Text>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#E23744" />
                </View>
            ) : (
                <FlatList
                    data={filteredReviews}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={
                        <View>
                            <RatingSummary
                                average={stats.average}
                                totalCount={stats.totalCount}
                                distribution={stats.distribution}
                            />
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
                                {FILTERS.map(f => (
                                    <TouchableOpacity
                                        key={f.id}
                                        style={[styles.chip, filter === f.id && styles.activeChip]}
                                        onPress={() => dispatch(setFilter(f.id as any))}
                                    >
                                        <Text style={[styles.chipText, filter === f.id && styles.activeChipText]}>
                                            {f.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <ReviewCard review={item} onReply={handleReply} />
                    )}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
    filterRow: {
        marginBottom: 16,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    activeChip: {
        backgroundColor: '#1C1C1C',
        borderColor: '#1C1C1C',
    },
    chipText: {
        color: '#666',
        fontWeight: '600',
        fontSize: 12,
    },
    activeChipText: {
        color: '#FFF',
    }
});

export default ReviewsScreen;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Review {
    id: string;
    customerName: string;
    rating: number; // 1-5
    date: string;
    text: string;
    response?: string;
    helpfulCount: number;
    hasPhotos: boolean;
    photos?: string[];
}

interface RatingStats {
    average: number;
    totalCount: number;
    distribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

interface ReviewsState {
    reviews: Review[];
    filteredReviews: Review[];
    stats: RatingStats;
    filter: 'ALL' | '5' | '4' | '3' | '2' | '1' | 'PHOTOS';
    loading: boolean;
    error: string | null;
}

const initialState: ReviewsState = {
    reviews: [],
    filteredReviews: [],
    stats: {
        average: 0,
        totalCount: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    },
    filter: 'ALL',
    loading: false,
    error: null,
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviewsData: (state, action: PayloadAction<{ reviews: Review[]; stats: RatingStats }>) => {
            state.reviews = action.payload.reviews;
            state.stats = action.payload.stats;
            state.filteredReviews = action.payload.reviews; // Reset filter on load
        },
        respondToReview: (state, action: PayloadAction<{ id: string; response: string }>) => {
            const review = state.reviews.find(r => r.id === action.payload.id);
            if (review) {
                review.response = action.payload.response;
            }
            // Update filtered list as well if needed
            const fReview = state.filteredReviews.find(r => r.id === action.payload.id);
            if (fReview) {
                fReview.response = action.payload.response;
            }
        },
        setFilter: (state, action: PayloadAction<ReviewsState['filter']>) => {
            state.filter = action.payload;
            if (action.payload === 'ALL') {
                state.filteredReviews = state.reviews;
            } else if (action.payload === 'PHOTOS') {
                state.filteredReviews = state.reviews.filter(r => r.hasPhotos);
            } else {
                const rating = parseInt(action.payload, 10);
                state.filteredReviews = state.reviews.filter(r => r.rating === rating);
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setReviewsData, respondToReview, setFilter, setLoading } = reviewsSlice.actions;
export default reviewsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AnalyticsData {
    revenue: number;
    totalOrders: number;
    avgOrderValue: number;
    completionRate: number;
    customerRating: number;
    avgPrepTime: number;
}

export interface ChartData {
    labels: string[];
    datasets: { data: number[] }[];
}

export interface TopItem {
    id: string;
    name: string;
    orders: number;
    revenue: number;
    rating: number;
}

interface AnalyticsState {
    overview: AnalyticsData | null;
    revenueTrend: ChartData | null;
    ordersTrend: ChartData | null;
    topItems: TopItem[];
    loading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    overview: null,
    revenueTrend: null,
    ordersTrend: null,
    topItems: [],
    loading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setAnalyticsData: (state, action: PayloadAction<{
            overview: AnalyticsData;
            revenueTrend: ChartData;
            ordersTrend: ChartData;
        }>) => {
            state.overview = action.payload.overview;
            state.revenueTrend = action.payload.revenueTrend;
            state.ordersTrend = action.payload.ordersTrend;
        },
        setTopItems: (state, action: PayloadAction<TopItem[]>) => {
            state.topItems = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setAnalyticsData, setTopItems, setLoading, setError } = analyticsSlice.actions;
export default analyticsSlice.reducer;

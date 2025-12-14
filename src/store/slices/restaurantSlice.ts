import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OperatingHours {
    day: string;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
}

export interface Restaurant {
    id: string;
    name: string;
    description?: string;
    cuisineTypes?: string[];
    image?: string;
    logo?: string;
    phoneNumber?: string;
    email?: string;
    address: string;
    rating?: number;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'CLOSED';

    hours?: OperatingHours[];
    deliverySettings?: {
        radius: number;
        minOrder: number;
        deliveryFee: number;
        prepTime: number;
    };
    notificationSettings?: {
        newOrder: boolean;
        orderUpdate: boolean;
        reviews: boolean;
    };
}

interface RestaurantState {
    restaurants: Restaurant[];
    currentRestaurant: Restaurant | null;
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantState = {
    restaurants: [],
    currentRestaurant: null,
    loading: false,
    error: null,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
            state.restaurants = action.payload;
        },
        selectRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.currentRestaurant = action.payload;
        },
        addRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.restaurants.push(action.payload);
        },
        updateRestaurantStatus: (state, action: PayloadAction<{ id: string; status: Restaurant['status'] }>) => {
            const restaurant = state.restaurants.find(r => r.id === action.payload.id);
            if (restaurant) {
                restaurant.status = action.payload.status;
            }
            if (state.currentRestaurant?.id === action.payload.id) {
                state.currentRestaurant.status = action.payload.status;
            }
        },
        updateRestaurantDetails: (state, action: PayloadAction<{ id: string; data: Partial<Restaurant> }>) => {
            if (state.currentRestaurant?.id === action.payload.id) {
                state.currentRestaurant = { ...state.currentRestaurant, ...action.payload.data };
            }
            const idx = state.restaurants.findIndex(r => r.id === action.payload.id);
            if (idx !== -1) {
                state.restaurants[idx] = { ...state.restaurants[idx], ...action.payload.data };
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const {
    setRestaurants, selectRestaurant, addRestaurant,
    updateRestaurantStatus, updateRestaurantDetails, setLoading
} = restaurantSlice.actions;
export default restaurantSlice.reducer;

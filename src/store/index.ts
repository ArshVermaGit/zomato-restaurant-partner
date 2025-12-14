import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './slices/authSlice';
import restaurantReducer from './slices/restaurantSlice';
import dashboardReducer from './slices/dashboardSlice';
import orderReducer from './slices/orderSlice';
import menuReducer from './slices/menuSlice';
import analyticsReducer from './slices/analyticsSlice';
import reviewsReducer from './slices/reviewsSlice';
import financialsReducer from './slices/financialsSlice';
import staffReducer from './slices/staffSlice';
import notificationReducer from './slices/notificationSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'restaurant'], // Persist auth and selected restaurant
};

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    dashboard: dashboardReducer,
    orders: orderReducer,
    menu: menuReducer,
    analytics: analyticsReducer,
    reviews: reviewsReducer,
    financials: financialsReducer,
    staff: staffReducer,
    notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    isVeg: boolean;
    isAvailable: boolean;
    image?: string;
    variants?: any[]; // For future modifiers
}

export interface MenuCategory {
    id: string;
    name: string;
    isVisible: boolean;
}

interface MenuState {
    categories: MenuCategory[];
    items: Record<string, MenuItem>; // Normalized items by ID
    loading: boolean;
    error: string | null;
}

const initialState: MenuState = {
    categories: [],
    items: {},
    loading: false,
    error: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuData: (state, action: PayloadAction<{ categories: MenuCategory[]; items: MenuItem[] }>) => {
            state.categories = action.payload.categories;
            state.items = action.payload.items.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {} as Record<string, MenuItem>);
        },
        addCategory: (state, action: PayloadAction<MenuCategory>) => {
            state.categories.push(action.payload);
        },
        updateCategory: (state, action: PayloadAction<MenuCategory>) => {
            const index = state.categories.findIndex(c => c.id === action.payload.id);
            if (index !== -1) state.categories[index] = action.payload;
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(c => c.id !== action.payload);
            // Also cleanup items for this category (optional but good practice)
            // In a real app, backend handles constraint checks
        },
        addItem: (state, action: PayloadAction<MenuItem>) => {
            state.items[action.payload.id] = action.payload;
        },
        updateItem: (state, action: PayloadAction<MenuItem>) => {
            state.items[action.payload.id] = action.payload;
        },
        toggleItemAvailability: (state, action: PayloadAction<{ id: string; isAvailable: boolean }>) => {
            if (state.items[action.payload.id]) {
                state.items[action.payload.id].isAvailable = action.payload.isAvailable;
            }
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            delete state.items[action.payload];
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCategories: (state, action: PayloadAction<MenuCategory[]>) => {
            state.categories = action.payload;
        },
        bulkUpdateAvailability: (state, action: PayloadAction<{ ids: string[]; isAvailable: boolean }>) => {
            action.payload.ids.forEach(id => {
                if (state.items[id]) {
                    state.items[id].isAvailable = action.payload.isAvailable;
                }
            });
        },
        bulkDeleteItems: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach(id => {
                delete state.items[id];
            });
        }
    },
});

export const {
    setMenuData, addCategory, updateCategory, deleteCategory,
    addItem, updateItem, toggleItemAvailability, deleteItem, setLoading, setCategories,
    bulkUpdateAvailability, bulkDeleteItems
} = menuSlice.actions;

export default menuSlice.reducer;

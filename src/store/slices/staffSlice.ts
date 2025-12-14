import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StaffMember {
    id: string;
    name: string;
    role: 'Manager' | 'Chef' | 'Cashier';
    phone: string;
    email: string;
    active: boolean;
}

interface StaffState {
    members: StaffMember[];
    loading: boolean;
    error: string | null;
}

const initialState: StaffState = {
    members: [],
    loading: false,
    error: null,
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaff: (state, action: PayloadAction<StaffMember[]>) => {
            state.members = action.payload;
        },
        addStaffMember: (state, action: PayloadAction<StaffMember>) => {
            state.members.push(action.payload);
        },
        removeStaffMember: (state, action: PayloadAction<string>) => {
            state.members = state.members.filter(m => m.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setStaff, addStaffMember, removeStaffMember, setLoading } = staffSlice.actions;
export default staffSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FinancialOverview {
    todayRevenue: number;
    weekRevenue: number;
    monthRevenue: number;
    pendingSettlement: number;
    nextPayoutDate: string;
    totalEarnings: number;
}

export interface Transaction {
    id: string;
    orderId: string;
    date: string;
    amount: number;
    commission: number;
    tax: number;
    netAmount: number;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
    description: string;
    type: 'CREDIT' | 'DEBIT';
}

export interface Payout {
    id: string;
    date: string;
    amount: number;
    status: 'PROCESSED' | 'PENDING' | 'FAILED';
    transactionRef: string;
}

interface FinancialsState {
    overview: FinancialOverview | null;
    transactions: Transaction[];
    payouts: Payout[];
    bankAccount: {
        bankName: string;
        accountNumber: string;
        ifsc: string;
        isVerified: boolean;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: FinancialsState = {
    overview: null,
    transactions: [],
    payouts: [],
    bankAccount: null,
    loading: false,
    error: null,
};

const financialsSlice = createSlice({
    name: 'financials',
    initialState,
    reducers: {
        setFinancialsOverview: (state, action: PayloadAction<FinancialOverview>) => {
            state.overview = action.payload;
        },
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload;
        },
        setPayouts: (state, action: PayloadAction<Payout[]>) => {
            state.payouts = action.payload;
        },
        setBankAccount: (state, action: PayloadAction<FinancialsState['bankAccount']>) => {
            state.bankAccount = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setFinancialsOverview, setTransactions, setPayouts, setBankAccount,
    setLoading, setError
} = financialsSlice.actions;

export default financialsSlice.reducer;

// @ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Assuming base API structure
export const paymentsApi = createApi({
    reducerPath: 'paymentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        createPaymentOrder: builder.mutation<any, any>({
            query: (data) => ({
                url: '/payments/create-order',
                method: 'POST',
                body: data,
            }),
        }),
        createAdHocPayment: builder.mutation<any, { amount: number; purpose: string }>({
            query: (data) => ({
                url: '/payments/create-adhoc',
                method: 'POST',
                body: data,
            }),
        }),
        verifyPayment: builder.mutation<any, any>({
            query: (data) => ({
                url: '/payments/verify',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useCreatePaymentOrderMutation,
    useCreateAdHocPaymentMutation,
    useVerifyPaymentMutation
} = paymentsApi;

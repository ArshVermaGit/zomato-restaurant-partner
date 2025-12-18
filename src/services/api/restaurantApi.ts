import { api } from './baseApi';
import { RestaurantStats, OrderDetail, ApiResponse } from './api.types';

export const restaurantApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRestaurantStats: builder.query<ApiResponse<RestaurantStats>, string>({
            query: (id) => `/restaurants/${id}/stats`,
            providesTags: ['Stats'],
        }),
        getRestaurantOrders: builder.query<ApiResponse<OrderDetail[]>, { id: string; status?: string }>({
            query: ({ id, status }) => ({
                url: `/restaurants/${id}/orders`,
                params: { status },
            }),
            providesTags: ['Orders'],
        }),
        updateOrderStatus: builder.mutation<ApiResponse<OrderDetail>, { orderId: string; status: string }>({
            query: ({ orderId, status }) => ({
                url: `/orders/${orderId}/status`,
                method: 'PATCH',
                data: { status },
            }),
            invalidatesTags: ['Orders', 'Stats'],
        }),
    }),
});

export const {
    useGetRestaurantStatsQuery,
    useGetRestaurantOrdersQuery,
    useUpdateOrderStatusMutation,
} = restaurantApi;

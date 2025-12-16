import { RestaurantService as ApiRestaurantService, OrderService as ApiOrderService } from '@zomato/api-client';
import { store } from '../../store';
import { setRestaurants, addRestaurant, Restaurant } from '../../store/slices/restaurantSlice';

// Helper to simulate delay for mocks
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(() => resolve(), ms));

export const RestaurantService = {
    getMyRestaurants: async () => {
        try {
            const restaurants = await ApiRestaurantService.getMyRestaurants();
            // Map if needed
            const mapped = restaurants.map((r: any) => ({
                id: r.id,
                name: r.name,
                address: r.address,
                status: 'ACTIVE', // Mock status mapping
                rating: 4.5
            }));
            store.dispatch(setRestaurants(mapped));
            return mapped;
        } catch (error) {
            console.error('Fetch Restaurants Failed', error);
            // Fallback to mock if API fails/empty for demo
            const mockRestaurants: Restaurant[] = [
                {
                    id: 'REST-001',
                    name: 'Spicy Tandoor',
                    address: 'Sector 18, Noida',
                    status: 'ACTIVE',
                    rating: 4.5
                }
            ];
            store.dispatch(setRestaurants(mockRestaurants));
            return mockRestaurants;
        }
    },

    registerRestaurant: async (data: Partial<Restaurant>) => {
        try {
            const response = await ApiRestaurantService.create({
                name: data.name || '',
                address: data.address || ''
            });

            const newRestaurant: Restaurant = {
                id: response.id,
                name: response.name,
                address: response.address,
                status: 'PENDING',
                rating: 0
            };
            store.dispatch(addRestaurant(newRestaurant));
            return newRestaurant;
        } catch (error) {
            console.error('Register Restaurant Failed', error);
            throw error;
        }
    },

    getDashboardStats: async (restaurantId: string) => {
        await delay(500);
        return {
            revenue: 12500,
            totalOrders: 45,
            completedOrders: 42,
            cancelledOrders: 1,
            avgPrepTime: 18,
        };
    },

    getPendingOrders: async (restaurantId: string) => {
        try {
            const orders = await ApiOrderService.listOrders({ status: 'PENDING' });
            return orders.map((o: any) => ({
                id: o.id,
                customerName: o.user?.name || 'Customer',
                items: o.items.map((i: any) => ({ name: i.menuItem?.name, quantity: i.quantity })),
                amount: o.totalAmount,
                status: 'PENDING',
                createdAt: o.createdAt,
                expiryTime: new Date(new Date(o.createdAt).getTime() + 10 * 60000).toISOString()
            }));
        } catch (e) {
            console.error(e);
            return [];
        }
    },

    // ... Keeping other mocks wrapped ...
    acceptOrder: async (orderId: string) => {
        return await ApiOrderService.acceptOrder(orderId);
    },

    rejectOrder: async (orderId: string) => {
        return await ApiOrderService.cancelOrder(orderId, 'Restaurant Rejected');
    },

    getMenu: async (restaurantId: string) => {
        try {
            const menu = await ApiRestaurantService.getMenu(restaurantId);
            await delay(500);
            return {
                categories: [{ id: 'CAT-1', name: 'Starters', isVisible: true }],
                items: []
            };
        } catch (e) {
            return { categories: [], items: [] };
        }
    },

    getRecentOrders: async (restaurantId: string) => {
        await delay(500);
        return [];
    },
    updateStatus: async (restaurantId: string, isOpen: boolean) => {
        await delay(500);
        return isOpen;
    },
    getAllOrders: async (restaurantId: string, status?: string) => {
        await delay(500);
        return [];
    },
    updateOrder: async (orderId: string, status: string) => {
        await delay(500);
        return { id: orderId, status };
    },
    upsertCategory: async (c: any) => c,
    upsertItem: async (i: any) => i,
    deleteItem: async (id: string) => true,

    getAnalytics: async (id: string) => ({
        overview: { revenue: 1000, totalOrders: 10, avgOrderValue: 100, completionRate: 100, customerRating: 5, avgPrepTime: 20 },
        revenueTrend: { labels: [], datasets: [] },
        ordersTrend: { labels: [], datasets: [] }
    }),

    getTopItems: async (id: string) => [],

    getReviews: async (id: string) => ({
        reviews: [],
        stats: { average: 5, totalCount: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }
    }),

    respondToReview: async (id: string) => true,

    getFinancialsOverview: async (id: string) => ({
        todayRevenue: 0,
        weekRevenue: 0,
        monthRevenue: 0,
        pendingSettlement: 0,
        nextPayoutDate: '',
        totalEarnings: 0
    }),

    getTransactions: async (id: string) => [],
    getPayouts: async (id: string) => [],
    updateSettings: async (id: string) => true,
    getStaff: async (id: string) => [],
    addStaff: async (id: string) => ({}),
    removeStaff: async (id: string) => true,
};

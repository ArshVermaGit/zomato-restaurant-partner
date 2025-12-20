import { RestaurantService as ApiRestaurantService, OrderService as ApiOrderService } from '@zomato/api-client';
import { store } from '../../store';
import { setRestaurants, addRestaurant, Restaurant } from '../../store/slices/restaurantSlice';

export const RestaurantService = {
    getMyRestaurants: async () => {
        try {
            const restaurants = await ApiRestaurantService.getMyRestaurants();
            const mapped = restaurants.map((r: any) => ({
                id: r.id,
                name: r.name,
                address: r.address,
                status: 'ACTIVE',
                rating: 4.5 // TODO: Fetch from backend
            }));
            store.dispatch(setRestaurants(mapped));
            return mapped;
        } catch (error) {
            console.error('Fetch Restaurants Failed', error);
            throw error;
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

    // Unified analytics getter for dashboard screen
    getDashboardStats: async (_restaurantId: string) => {
        // MOCK: Backend endpoint not ready
        return {
            revenue: 12500,
            totalOrders: 45,
            completedOrders: 42,
            cancelledOrders: 3,
            avgPrepTime: 25,
            rating: 4.5,
            // Extra fields for compatibility if shared types need them
            avgOrderValue: 450,
            completionRate: 98,
            customerRating: 4.5,
            returningCustomers: 12
        };
    },

    getPendingOrders: async (_restaurantId: string) => {
        try {
            const orders = await ApiOrderService.listOrders({ status: 'PENDING' });
            return orders.map((o: any) => ({
                id: o.id,
                customerName: o.user?.name || 'Customer',
                items: o.items.map((i: any) => ({ name: i.menuItem?.name || 'Item', quantity: i.quantity })),
                amount: o.totalAmount,
                status: o.status,
                createdAt: o.createdAt,
            }));
        } catch (e) {
            console.error('Get Pending Orders Failed', e);
            throw e;
        }
    },

    getOrderDetails: async (orderId: string) => {
        try {
            const order = await ApiOrderService.findOne(orderId);
            return {
                id: order.id,
                status: order.status.toLowerCase(),
                placedAt: order.createdAt,
                customerName: order.user?.name || 'Customer',
                customerPhone: order.user?.phoneNumber || '',
                deliveryAddress: order.address?.formattedAddress || '',
                items: order.items.map((i: any) => ({
                    name: i.menuItem?.name || 'Item',
                    quantity: i.quantity,
                    price: i.price
                })),
                instructions: order.instructions || '',
                paymentMethod: order.paymentMethod || 'COD',
                totalAmount: order.totalAmount,
                breakdown: {
                    itemTotal: order.totalAmount,
                    taxes: 0,
                },
                pickupOTP: order.pickupOTP || '0000'
            };
        } catch (e) {
            console.error('Get Order Details Failed', e);
            throw e;
        }
    },

    acceptOrder: async (orderId: string) => {
        return await ApiOrderService.acceptOrder(orderId);
    },

    rejectOrder: async (orderId: string) => {
        return await ApiOrderService.cancelOrder(orderId, 'Restaurant Rejected');
    },

    markOrderPreparing: async (orderId: string) => {
        return await ApiOrderService.prepareOrder(orderId);
    },

    markOrderReady: async (orderId: string) => {
        return await ApiOrderService.readyOrder(orderId);
    },

    getMenu: async (restaurantId: string) => {
        try {
            const menu = await ApiRestaurantService.getMenu(restaurantId);
            // Ensure response has expected structure, basic mapping
            // Backend should return { categories: [], items: [] } or similar
            // If backend returns list of items with categoryId, need to group here.
            // Assuming simplified backend response for MVP:
            return menu || { categories: [], items: [] };
        } catch (e) {
            console.error('Get Menu Failed', e);
            throw e;
        }
    },

    getRecentOrders: async (_restaurantId: string) => [],
    updateStatus: async (_restaurantId: string, isOpen: boolean) => isOpen,
    getAllOrders: async (_restaurantId: string, status?: string) => {
        try {
            const filters: any = {};
            if (status && status !== 'ALL') filters.status = status;

            const orders = await ApiOrderService.listOrders(filters);
            return orders.map((o: any) => ({
                id: o.id,
                customerName: o.user?.name || 'Customer',
                items: o.items.map((i: any) => ({ name: i.menuItem?.name || 'Item', quantity: i.quantity })),
                amount: o.totalAmount,
                status: o.status,
                createdAt: o.createdAt,
                displayId: o.id.slice(-6).toUpperCase()
            }));
        } catch (e) {
            console.error('Get All Orders Failed', e);
            throw e;
        }
    },
    updateOrder: async (orderId: string, status: string) => ({ id: orderId, status }),
    upsertCategory: async (c: any) => c,

    upsertItem: async (i: any) => {
        // This method signature in the service might need to be updated to accept restaurantId
        // For now, assuming context or partial impl. 
        // Real implementation should be:
        // if (i.id) return ApiRestaurantService.updateMenuItem(restaurantId, i.id, i);
        // else return ApiRestaurantService.createMenuItem(restaurantId, i);
        return i;
    },

    deleteItem: async (_id: string) => {
        // needs restaurantId
        // return ApiRestaurantService.deleteMenuItem(restaurantId, id);
        return true;
    },

    getAnalytics: async (_id: string, _range: string = 'WEEK') => {
        // MOCK: Matching AnalyticsData interface
        return {
            overview: {
                revenue: 45000,
                totalOrders: 120,
                avgOrderValue: 375,
                completionRate: 98,
                customerRating: 4.6,
                avgPrepTime: 22,
                activeDish: 'Butter Chicken',
                returningCustomers: 45
            },
            revenueTrend: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{ data: [5000, 7000, 4500, 9000, 12000, 15000, 11000] }]
            },
            ordersTrend: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{ data: [12, 15, 10, 18, 25, 30, 22] }]
            }
        };
    },

    getTopItems: async (_id: string) => [
        { id: '1', name: 'Butter Chicken', orders: 150, revenue: 45000, rating: 4.8 },
        { id: '2', name: 'Dal Makhani', orders: 120, revenue: 30000, rating: 4.7 },
        { id: '3', name: 'Naan', orders: 300, revenue: 15000, rating: 4.5 },
    ],

    getReviews: async (_id: string) => {
        // MOCK
        return {
            reviews: [],
            stats: {
                average: 4.5,
                totalCount: 120,
                distribution: { 5: 80, 4: 30, 3: 5, 2: 3, 1: 2 }
            }
        };
    },
    respondToReview: async (_id: string, _response: string) => true,

    getFinancialsOverview: async (_id: string) => {
        // MOCK
        return {
            todayRevenue: 5400,
            weekRevenue: 45000,
            monthRevenue: 180000,
            pendingSettlement: 12500,
            nextPayoutAmount: 5400,
            nextPayoutDate: '2025-12-18T10:00:00Z',
            totalEarnings: 850000, // Added missing field
        };
    },

    getTransactions: async (_id: string) => [
        { id: 't1', date: '2025-12-16', amount: 1250, type: 'CREDIT', description: 'Order #1234' },
        { id: 't2', date: '2025-12-15', amount: 4500, type: 'DEBIT', description: 'Payout to Bank' },
    ],

    getPayouts: async (_id: string) => [],

    getBankAccount: async (_id: string) => ({
        bankName: 'HDFC Bank',
        accountNumber: '**** **** **** 1234',
        ifsc: 'HDFC0001234',
        isVerified: true
    }),

    getNotifications: async (_id: string) => {
        return [
            { id: '1', type: 'ORDER_NEW', title: 'New Order Received', message: 'Order #1234 from John Doe', timestamp: new Date().toISOString(), read: false },
        ];
    },
    updateSettings: async (_id: string, _updates: any) => true,
    getStaff: async (_id: string) => [],
    addStaff: async (_id: string, _staff: any) => ({}),
    removeStaff: async (_id: string) => true,
};

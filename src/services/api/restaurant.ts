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

    getDashboardStats: async (restaurantId: string) => {
        try {
            return await ApiRestaurantService.getDashboardStats(restaurantId);
        } catch (e) {
            console.error('Get Dashboard Stats Failed', e);
            // Return zeros on error to prevent crash
            return {
                revenue: 0,
                totalOrders: 0,
                completedOrders: 0,
                cancelledOrders: 0,
                avgPrepTime: 0,
                rating: 0,
            };
        }
    },

    getPendingOrders: async (restaurantId: string) => {
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

    getRecentOrders: async (restaurantId: string) => [],
    updateStatus: async (restaurantId: string, isOpen: boolean) => isOpen,
    getAllOrders: async (restaurantId: string, status?: string) => {
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
        const restaurantId = 'current-restaurant-id'; // Ideally passed or from state
        // This method signature in the service might need to be updated to accept restaurantId
        // For now, assuming context or partial impl. 
        // Real implementation should be:
        // if (i.id) return ApiRestaurantService.updateMenuItem(restaurantId, i.id, i);
        // else return ApiRestaurantService.createMenuItem(restaurantId, i);
        return i;
    },

    deleteItem: async (id: string) => {
        // needs restaurantId
        // return ApiRestaurantService.deleteMenuItem(restaurantId, id);
        return true;
    },

    getAnalytics: async (id: string) => {
        try {
            return await ApiRestaurantService.getDashboardStats(id);
        } catch (e) { return { overview: {}, revenueTrend: [], ordersTrend: [] }; }
    },
    getTopItems: async (id: string) => [],
    getReviews: async (id: string) => {
        try {
            return await ApiRestaurantService.getReviews(id);
        } catch (e) { return { reviews: [], stats: {} }; }
    },
    respondToReview: async (id: string, response: string) => true,

    getFinancialsOverview: async (id: string) => {
        try {
            return await ApiRestaurantService.getFinancials(id);
        } catch (e) { return {}; }
    },

    getTransactions: async (id: string) => [],
    getPayouts: async (id: string) => [],
    getBankAccount: async (id: string) => ({}),
    getNotifications: async (id: string) => {
        return [
            { id: '1', type: 'ORDER_NEW', title: 'New Order Received', message: 'Order #1234 from John Doe', timestamp: new Date().toISOString(), read: false },
        ];
    },
    updateSettings: async (id: string, updates: any) => true,
    getStaff: async (id: string) => [],
    addStaff: async (id: string, staff: any) => ({}),
    removeStaff: async (id: string) => true,
};

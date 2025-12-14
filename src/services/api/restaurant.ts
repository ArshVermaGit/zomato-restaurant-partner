import apiClient from './axiosInstance';
import { store } from '../../store';
import { setRestaurants, addRestaurant, Restaurant } from '../../store/slices/restaurantSlice';

export const RestaurantService = {
    getMyRestaurants: async () => {
        try {
            // Mocking response for now until backend endpoint is fully ready/tested
            // In real integration: const response = await apiClient.get('/restaurants/my-restaurants');

            // Simulating API delay
            await new Promise(resolve => setTimeout(() => resolve(true), 800));

            const mockRestaurants: Restaurant[] = [
                {
                    id: 'REST-001',
                    name: 'Spicy Tandoor',
                    address: 'Sector 18, Noida',
                    status: 'ACTIVE',
                    rating: 4.5
                },
                {
                    id: 'REST-002',
                    name: 'Burger Point',
                    address: 'Sector 62, Noida',
                    status: 'CLOSED', // Currently offline
                    rating: 4.0
                }
            ];

            store.dispatch(setRestaurants(mockRestaurants));
            return mockRestaurants;
        } catch (error) {
            console.error('Fetch Restaurants Failed', error);
            throw error;
        }
    },

    registerRestaurant: async (data: Partial<Restaurant>) => {
        try {
            // const response = await apiClient.post('/restaurants', data);
            await new Promise(resolve => setTimeout(() => resolve(true), 1000));

            const newRestaurant: Restaurant = {
                id: `REST-${Date.now()}`,
                name: data.name || 'New Restaurant',
                address: data.address || '',
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
        // Mock API
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return {
            revenue: 12500,
            totalOrders: 45,
            completedOrders: 42,
            cancelledOrders: 1,
            avgPrepTime: 18,
        };
    },

    getPendingOrders: async (restaurantId: string) => {
        // Mock API
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return [
            {
                id: 'ORD-101',
                customerName: 'Rahul Sharma',
                items: [{ name: 'Butter Chicken', quantity: 1 }, { name: 'Naan', quantity: 2 }],
                amount: 450,
                status: 'PENDING',
                createdAt: new Date().toISOString(),
                expiryTime: new Date(Date.now() + 5 * 60000).toISOString() // 5 mins from now
            },
            {
                id: 'ORD-102',
                customerName: 'Sneha Gupta',
                items: [{ name: 'Veg Biryani', quantity: 1 }],
                amount: 280,
                status: 'PENDING',
                createdAt: new Date(Date.now() - 60000).toISOString(),
                expiryTime: new Date(Date.now() + 4 * 60000).toISOString()
            }
        ];
    },

    getRecentOrders: async (restaurantId: string) => {
        // Mock API
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return [
            {
                id: 'ORD-099',
                customerName: 'Amit Verma',
                items: [{ name: 'Paneer Tikka', quantity: 1 }],
                amount: 320,
                status: 'DELIVERED',
                createdAt: new Date(Date.now() - 3600000).toISOString(),
            },
            {
                id: 'ORD-098',
                customerName: 'Priya Singh',
                items: [{ name: 'Dal Makhani', quantity: 1 }],
                amount: 250,
                status: 'DELIVERED',
                createdAt: new Date(Date.now() - 7200000).toISOString(),
            }
        ];
    },

    updateStatus: async (restaurantId: string, isOpen: boolean) => {
        // Mock API
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return isOpen;
    },

    acceptOrder: async (orderId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return true;
    },

    rejectOrder: async (orderId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return true;
    },

    getAllOrders: async (restaurantId: string, status?: string) => {
        // Mock API
        await new Promise(resolve => setTimeout(() => resolve(true), 600));
        // Generate mock orders
        const statuses = ['PENDING', 'PREPARING', 'READY_FOR_PICKUP', 'DELIVERED', 'CANCELLED'];

        const mockOrders = Array.from({ length: 15 }).map((_, i) => ({
            id: `ORD-100${i}`,
            customerName: `Customer ${i + 1}`,
            items: [
                { name: 'Paneer Butter Masala', quantity: 1 },
                { name: 'Garlic Naan', quantity: 2 }
            ],
            amount: 350 + (i * 50),
            status: status || statuses[i % 5],
            createdAt: new Date(Date.now() - i * 1800000).toISOString(), // 30 mins interval
        }));

        return mockOrders;
    },

    updateOrder: async (orderId: string, status: string, additionalData?: any) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return {
            id: orderId,
            status,
            ...additionalData
        };
    },

    getMenu: async (restaurantId: string) => {
        // Mock API
        await new Promise(resolve => setTimeout(() => resolve(true), 800));

        const categories = [
            { id: 'CAT-1', name: 'Recommended', isVisible: true },
            { id: 'CAT-2', name: 'Starters', isVisible: true },
            { id: 'CAT-3', name: 'Main Course', isVisible: true },
            { id: 'CAT-4', name: 'Breads', isVisible: true },
        ];

        const items = [
            { id: 'ITM-1', categoryId: 'CAT-1', name: 'Butter Chicken', price: 350, isVeg: false, isAvailable: true, description: 'Rich creamy gravy with tender chicken' },
            { id: 'ITM-2', categoryId: 'CAT-1', name: 'Dal Makhani', price: 280, isVeg: true, isAvailable: true, description: 'Black lentils cooked overnight' },
            { id: 'ITM-3', categoryId: 'CAT-2', name: 'Paneer Tikka', price: 250, isVeg: true, isAvailable: true, description: 'Cottage cheese marinated in spices' },
            { id: 'ITM-4', categoryId: 'CAT-4', name: 'Butter Naan', price: 50, isVeg: true, isAvailable: true, description: 'Soft bread with butter' },
        ];

        return { categories, items };
    },

    upsertCategory: async (category: any) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return { ...category, id: category.id || `CAT-${Date.now()}` };
    },

    upsertItem: async (item: any) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return { ...item, id: item.id || `ITM-${Date.now()}` };
    },

    deleteItem: async (itemId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return true;
    },

    getAnalytics: async (restaurantId: string, range: string) => {
        // Mock API
        await new Promise(resolve => setTimeout(() => resolve(true), 1000));

        // Mock Random Data based on range
        const multiplier = range === 'WEEK' ? 7 : range === 'MONTH' ? 30 : 1;

        return {
            overview: {
                revenue: 15600 * multiplier,
                totalOrders: 45 * multiplier,
                avgOrderValue: 350,
                completionRate: 98,
                customerRating: 4.6,
                avgPrepTime: 18,
            },
            revenueTrend: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{ data: [12000, 15000, 11000, 18000, 22000, 25000, 19000] }]
            },
            ordersTrend: {
                labels: ['10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
                datasets: [{ data: [5, 12, 10, 8, 25, 30, 20] }]
            }
        };
    },

    getTopItems: async (restaurantId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 600));
        return [
            { id: '1', name: 'Butter Chicken', orders: 150, revenue: 52500, rating: 4.8 },
            { id: '2', name: 'Dal Makhani', orders: 120, revenue: 33600, rating: 4.6 },
            { id: '3', name: 'Garlic Naan', orders: 300, revenue: 15000, rating: 4.7 },
            { id: '4', name: 'Paneer Tikka', orders: 85, revenue: 21250, rating: 4.5 },
            { id: '5', name: 'Veg Biryani', orders: 70, revenue: 17500, rating: 4.4 },
        ];
    },

    getReviews: async (restaurantId: string) => {
        // Mock API
        await new Promise(resolve => setTimeout(() => resolve(true), 800));

        const reviews = Array.from({ length: 20 }).map((_, i) => ({
            id: `REV-${i}`,
            customerName: `Customer ${i + 1}`,
            rating: Math.floor(Math.random() * 2) + 4, // Mostly 4-5 stars
            date: new Date(Date.now() - i * 86400000).toISOString(),
            text: i % 3 === 0 ? 'Amazing food! Loved the taste and packaging.' : 'Good experience, but delivery was slightly late.',
            helpfulCount: Math.floor(Math.random() * 10),
            hasPhotos: i % 4 === 0,
            response: i % 5 === 0 ? 'Thank you so much for your kind words!' : undefined,
        }));

        const stats = {
            average: 4.5,
            totalCount: 150,
            distribution: { 5: 90, 4: 40, 3: 10, 2: 5, 1: 5 }
        };

        return { reviews, stats };
    },

    respondToReview: async (reviewId: string, response: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return true;
    },

    getFinancialsOverview: async (restaurantId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 700));
        return {
            todayRevenue: 12500,
            weekRevenue: 85000,
            monthRevenue: 340000,
            pendingSettlement: 24500,
            nextPayoutDate: '2025-12-16',
            totalEarnings: 4500000,
        };
    },

    getTransactions: async (restaurantId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 800));
        return Array.from({ length: 15 }).map((_, i) => {
            const amount = 300 + Math.floor(Math.random() * 500);
            return {
                id: `TXN-${1000 + i}`,
                orderId: `ORD-${202500 + i}`,
                date: new Date(Date.now() - i * 3600000 * 2).toISOString(),
                amount,
                commission: Math.round(amount * 0.2), // 20% commission
                tax: Math.round(amount * 0.05), // 5% tax
                netAmount: Math.round(amount * 0.75),
                status: (i < 5 ? 'PENDING' : 'PAID') as 'PENDING' | 'PAID',
            };
        });
    },

    getPayouts: async (restaurantId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 600));
        return Array.from({ length: 5 }).map((_, i) => ({
            id: `PAY-${5000 + i}`,
            date: new Date(Date.now() - (i + 1) * 7 * 86400000).toISOString(), // Weekly
            amount: 75000 + Math.floor(Math.random() * 20000),
            status: 'PROCESSED' as 'PROCESSED',
            transactionRef: `UTR-${9900 + i}`
        }));
    },

    updateSettings: async (restaurantId: string, data: any) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 500));
        return true;
    },

    getStaff: async (restaurantId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 600));
        return [
            { id: '1', name: 'Ramesh Gupta', role: 'Manager', phone: '9876543210', email: 'ramesh@example.com', active: true },
            { id: '2', name: 'Suresh Kumar', role: 'Chef', phone: '9876543211', email: 'suresh@example.com', active: true },
            { id: '3', name: 'Mahesh Verma', role: 'Cashier', phone: '9876543212', email: 'mahesh@example.com', active: true },
        ];
    },

    addStaff: async (restaurantId: string, staffData: any) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 800));
        return { id: `STAFF-${Date.now()}`, ...staffData, active: true };
    },

    removeStaff: async (staffId: string) => {
        await new Promise(resolve => setTimeout(() => resolve(true), 400));
        return true;
    }
};

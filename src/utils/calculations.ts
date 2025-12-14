import { Order } from '../store/slices/dashboardSlice';

export const calculateTotalRevenue = (orders: Order[]): number => {
    return orders.reduce((total, order) => {
        return order.status === 'DELIVERED'
            ? total + order.amount
            : total;
    }, 0);
};

export const calculateAveragePrepTime = (completedOrders: Order[]): number => {
    if (completedOrders.length === 0) return 0;

    // Mock prep time logic: assuming we had prepTime field or diff
    // For now, let's just return a mock average based on item count
    const totalItems = completedOrders.reduce((sum, order) => sum + order.items.length, 0);
    return Math.round((totalItems * 5) / completedOrders.length); // 5 mins per item avg
};

import { calculateTotalRevenue, calculateAveragePrepTime } from './calculations';
import { Order } from '../store/slices/dashboardSlice';

const mockOrders: Order[] = [
    {
        id: '1', customerName: 'John', items: [{ name: 'Burger', quantity: 1 }], amount: 100,
        status: 'DELIVERED', createdAt: '2023-01-01'
    },
    {
        id: '2', customerName: 'Jane', items: [{ name: 'Pizza', quantity: 1 }], amount: 200,
        status: 'CANCELLED', createdAt: '2023-01-01'
    },
    {
        id: '3', customerName: 'Bob', items: [{ name: 'Fries', quantity: 2 }], amount: 50,
        status: 'DELIVERED', createdAt: '2023-01-01'
    }
];

describe('Calculations Utils', () => {
    it('calculates total revenue correctly ignoring cancelled orders', () => {
        const revenue = calculateTotalRevenue(mockOrders);
        expect(revenue).toBe(150); // 100 + 50
    });

    it('calculates average prep time correctly', () => {
        const completedOrders = mockOrders.filter(o => o.status === 'DELIVERED');
        const avgTime = calculateAveragePrepTime(completedOrders);
        // Order 1: 1 item, Order 3: 1 item (Wait, items is array of objs, let's fix mock)
        // Order 3 has items: [{name: 'Fries', quantity: 2}] -> Actually utils count array length not quantity for simplicity?
        // Let's check utils: "sum + order.items.length".
        // Order 1: 1 item type. Order 3: 1 item type. Total 2.
        // Avg = (2 * 5) / 2 = 5.
        expect(avgTime).toBe(5);
    });
});

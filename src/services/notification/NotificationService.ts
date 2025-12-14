import { store } from '../../store';
import { addNotification, Notification } from '../../store/slices/notificationSlice';

// Mock WebSocket Service
class NotificationService {
    private static instance: NotificationService;
    private timer: NodeJS.Timeout | null = null;
    private listeners: { [key: string]: Function[] } = {};

    private constructor() { }

    static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    connect(restaurantId: string) {
        console.log(`[NotificationService] Connected to WS for restaurant ${restaurantId}`);
        // Simulate random incoming events
        this.startMockEvents();
    }

    disconnect() {
        if (this.timer) clearInterval(this.timer);
    }

    private startMockEvents() {
        // Mock a new order every 60 seconds
        this.timer = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance each interval
                this.emitMockOrder();
            }
        }, 30000);
    }

    private emitMockOrder() {
        const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
        const notification: Notification = {
            id: Date.now().toString(),
            type: 'ORDER_NEW',
            title: 'New Order Received!',
            message: `Order #${orderId} has been placed.`,
            timestamp: new Date().toISOString(),
            data: { orderId },
            read: false,
        };

        // Dispatch to Redux
        store.dispatch(addNotification(notification));

        // Notify listeners (UI Toast)
        this.notifyListeners('notification', notification);
    }

    // Allow UI components to subscribe to events (like Toasts)
    subscribe(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);

        return () => {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        };
    }

    private notifyListeners(event: string, data: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }

    // Test helper to manually trigger
    triggerTestNotification() {
        this.emitMockOrder();
    }
}

export default NotificationService.getInstance();

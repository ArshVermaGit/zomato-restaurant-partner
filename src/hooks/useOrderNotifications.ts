import { useEffect } from 'react';
import { Vibration, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import Sound from 'react-native-sound';
import { useNavigation } from '@react-navigation/native';
import { addNewOrder, removeOrder } from '../store/slices/orderSlice';
import { Order } from '../store/slices/dashboardSlice';

const WS_URL = 'https://api.yourbackend.com'; // Replace with env var in real app

export const useOrderNotifications = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    useEffect(() => {
        // Initialize socket connection
        const socket = io(WS_URL, {
            transports: ['websocket'],
            autoConnect: true,
        });

        // Initialize sound
        Sound.setCategory('Playback');
        const orderAlert = new Sound('order_alert.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('new_order', (order: Order) => {
            console.log('New Order Received:', order.id);

            // Play sound
            orderAlert.play((success) => {
                if (!success) {
                    console.log('playback failed due to audio decoding errors');
                }
            });

            // Vibrate pattern: wait 0ms, vibrate 400ms, wait 200ms, vibrate 400ms
            Vibration.vibrate([0, 400, 200, 400]);

            // Show in-app alert (simple version of "notification")
            Alert.alert(
                'New Order!',
                `Order #${order.displayId || order.id.slice(0, 4)}`,
                [
                    {
                        text: 'View',
                        onPress: () => navigation.navigate('OrderDetail', { orderId: order.id })
                    },
                    { text: 'Dismiss', style: 'cancel' }
                ]
            );

            // Update Redux state
            dispatch(addNewOrder(order));
        });

        socket.on('order_cancelled', (orderId: string) => {
            console.log('Order Cancelled:', orderId);
            // Optionally show toast here
            Alert.alert('Order Cancelled', `Order ${orderId} has been cancelled.`);
            dispatch(removeOrder(orderId));
        });

        return () => {
            socket.disconnect();
            orderAlert.release();
        };
    }, [dispatch, navigation]);
};

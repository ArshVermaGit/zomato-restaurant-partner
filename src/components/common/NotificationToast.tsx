import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import NotificationService from '../../services/notification/NotificationService';
import { Notification } from '../../store/slices/notificationSlice';
import { Bell } from 'lucide-react-native';

const NotificationToast = () => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [slideAnim] = useState(new Animated.Value(-100)); // Start off-screen top

    useEffect(() => {
        const unsubscribe = NotificationService.subscribe('notification', (notif: Notification) => {
            showToast(notif);
        });
        return unsubscribe;
    }, []);

    const showToast = (notif: Notification) => {
        setNotification(notif);

        // Slide down
        Animated.spring(slideAnim, {
            toValue: 20, // Distance from top
            useNativeDriver: true,
        }).start();

        // Auto hide after 3 seconds
        setTimeout(() => {
            hideToast();
        }, 4000);
    };

    const hideToast = () => {
        Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setNotification(null));
    };

    if (!notification) return null;

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.iconBox}>
                <Bell size={20} color="#FFF" />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.message}>{notification.message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 16,
        right: 16,
        backgroundColor: '#1C1C1C',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        zIndex: 9999, // Ensure it's on top
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E23744',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    message: {
        color: '#CCC',
        fontSize: 12,
    }
});

export default NotificationToast;

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { markAllAsRead, markAsRead, clearAllNotifications, Notification } from '../../store/slices/notificationSlice';
import { Bell } from 'lucide-react-native';
import { NotificationCard } from '../../components/notifications/NotificationCard';
import { Button } from '@zomato/ui'; // Assuming this exists or using standard button

const RestaurantNotificationsScreen = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state: RootState) => state.notification.notifications);

    const handleNotificationPress = (item: Notification) => {
        dispatch(markAsRead(item.id));
        // Navigation logic based on data if needed
    };

    const handleMarkAllRead = () => {
        dispatch(markAllAsRead());
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
                {notifications.length > 0 && (
                    <TouchableOpacity onPress={() => dispatch(clearAllNotifications())}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            {notifications.length === 0 ? (
                <View style={styles.empty}>
                    <Bell size={48} color="#DDD" />
                    <Text style={styles.emptyText}>No notifications yet</Text>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <NotificationCard
                            type={item.type}
                            title={item.title}
                            message={item.message}
                            time={new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            isRead={item.read}
                            onPress={() => handleNotificationPress(item)}
                        />
                    )}
                    contentContainerStyle={styles.list}
                />
            )}

            <View style={styles.footer}>
                <Button variant="ghost" onPress={handleMarkAllRead} fullWidth>
                    Mark All as Read
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 16,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    clearText: {
        color: '#828282',
        fontSize: 14,
        fontWeight: '500',
    },
    list: {
        paddingBottom: 80,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        backgroundColor: '#FFF',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: 16,
        color: '#999',
        fontSize: 16,
    }
});

export default RestaurantNotificationsScreen;

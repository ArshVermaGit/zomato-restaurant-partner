import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { markAllAsRead, markAsRead, clearAllNotifications } from '../../store/slices/notificationSlice';
import { Bell, CheckCircle, Trash2 } from 'lucide-react-native';

const NotificationsListScreen = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state: RootState) => state.notification.notifications);

    const handleRead = (id: string) => {
        dispatch(markAsRead(id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => dispatch(markAllAsRead())}>
                        <Text style={styles.actionText}>Read All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(clearAllNotifications())}>
                        <Text style={styles.actionText}>Clear</Text>
                    </TouchableOpacity>
                </View>
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
                        <TouchableOpacity
                            style={[
                                styles.card,
                                !item.read && styles.unreadCard
                            ]}
                            onPress={() => handleRead(item.id)}
                        >
                            <View style={styles.iconColumn}>
                                <View style={[styles.dot, !item.read && styles.unreadDot]} />
                            </View>
                            <View style={styles.content}>
                                <Text style={[styles.cardTitle, !item.read && styles.unreadText]}>{item.title}</Text>
                                <Text style={styles.cardMessage}>{item.message}</Text>
                                <Text style={styles.time}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 16,
        paddingTop: 50,
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
    actions: {
        flexDirection: 'row',
        gap: 16,
    },
    actionText: {
        color: '#E23744',
        fontWeight: '600',
    },
    list: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    unreadCard: {
        backgroundColor: '#FFF5F5',
    },
    iconColumn: {
        marginRight: 12,
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    unreadDot: {
        backgroundColor: '#E23744',
    },
    content: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    unreadText: {
        fontWeight: 'bold',
    },
    cardMessage: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
    },
    time: {
        fontSize: 12,
        color: '#999',
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

export default NotificationsListScreen;

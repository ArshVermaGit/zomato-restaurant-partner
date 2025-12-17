import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, CheckCircle, AlertCircle, Info, DollarSign } from 'lucide-react-native';

interface NotificationCardProps {
    type: 'ORDER_NEW' | 'ORDER_CANCELLED' | 'RIDER_ASSIGNED' | 'REVIEW_RECEIVED' | 'PAYMENT_RECEIVED' | 'SYSTEM';
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    onPress: () => void;
}

export const NotificationCard = ({ type, title, message, time, isRead, onPress }: NotificationCardProps) => {
    const getIcon = () => {
        switch (type) {
            case 'ORDER_NEW': return <Bell size={20} color="#E23744" />;
            case 'ORDER_CANCELLED': return <AlertCircle size={20} color="#E23744" />;
            case 'RIDER_ASSIGNED': return <CheckCircle size={20} color="#28A745" />;
            case 'PAYMENT_RECEIVED': return <DollarSign size={20} color="#28A745" />;
            case 'REVIEW_RECEIVED': return <CheckCircle size={20} color="#FFC107" />; // Or a star icon if available
            default: return <Info size={20} color="#007BFF" />;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.card, !isRead && styles.unreadCard]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <View style={[styles.iconCircle, !isRead && styles.unreadIcon]}>
                    {getIcon()}
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, !isRead && styles.unreadText]}>{title}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>{message}</Text>
            </View>
            {!isRead && <View style={styles.activeDot} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        alignItems: 'flex-start',
    },
    unreadCard: {
        backgroundColor: '#FFF9FA',
    },
    iconContainer: {
        marginRight: 12,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadIcon: {
        backgroundColor: '#FFE5E7',
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1C1C1C',
        flex: 1,
        marginRight: 8,
    },
    unreadText: {
        fontWeight: '700',
    },
    time: {
        fontSize: 12,
        color: '#828282',
    },
    message: {
        fontSize: 14,
        color: '#4F4F4F',
        lineHeight: 20,
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E23744',
        marginLeft: 8,
        marginTop: 6,
    },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Bell, Settings } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
    restaurantName: string;
    isOpen: boolean;
    onMenuPress: () => void;
}

const DashboardHeader: React.FC<Props> = ({ restaurantName, isOpen, onMenuPress }) => {
    const today = new Date().toDateString();
    const navigation = useNavigation<any>();
    const unreadCount = useSelector((state: RootState) => state.notification.unreadCount);

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity onPress={onMenuPress} style={styles.menuIcon}>
                    <Menu size={24} color="#1C1C1C" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>{restaurantName}</Text>
                    <View style={styles.statusRow}>
                        <View style={[styles.dot, isOpen ? styles.dotOpen : styles.dotClosed]} />
                        <Text style={styles.statusText}>{isOpen ? 'Open Now' : 'Closed'}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.date}>{today}</Text>
                <View style={styles.rightIconsContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Settings size={22} color="#444" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Bell size={24} color="#1C1C1C" />
                        {unreadCount > 0 && <View style={styles.badge} />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    dotOpen: {
        backgroundColor: '#4CAF50',
    },
    dotClosed: {
        backgroundColor: '#F44336',
    },
    right: {
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    rightIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        position: 'relative',
        padding: 4,
    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E23744',
        borderWidth: 1,
        borderColor: '#FFF',
    },
});

export default DashboardHeader;

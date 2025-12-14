import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    User, Clock, Truck, Users, Bell, CreditCard, ChevronRight, Store
} from 'lucide-react-native';

const MENU_ITEMS = [
    { id: 'profile', label: 'Restaurant Profile', icon: Store, route: 'ProfileEdit' },
    { id: 'hours', label: 'Operating Hours', icon: Clock, route: 'OperatingHours' },
    { id: 'delivery', label: 'Delivery Settings', icon: Truck, route: 'DeliverySettings' },
    { id: 'staff', label: 'Staff Management', icon: Users, route: 'StaffManagement' },
    { id: 'notifications', label: 'Notifications', icon: Bell, route: 'DeliverySettings' }, // Placeholder route
    { id: 'payments', label: 'Payment Settings', icon: CreditCard, route: 'DeliverySettings' }, // Placeholder route
];

const SettingsScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <View style={styles.menu}>
                {MENU_ITEMS.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.menuItem, index !== MENU_ITEMS.length - 1 && styles.borderBottom]}
                        onPress={() => navigation.navigate(item.route)}
                    >
                        <View style={styles.menuLeft}>
                            <View style={styles.iconBox}>
                                <item.icon size={20} color="#444" />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </View>
                        <ChevronRight size={20} color="#AAA" />
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.version}>App Version 1.0.0</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    menu: {
        backgroundColor: '#FFF',
        marginTop: 20,
        marginHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 4,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    version: {
        textAlign: 'center',
        marginTop: 40,
        color: '#999',
        fontSize: 12,
    }
});

export default SettingsScreen;

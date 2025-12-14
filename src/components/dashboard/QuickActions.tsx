import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ClipboardList, Monitor, Plus, FileText, BarChart2, Star, DollarSign } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const QuickActions = () => {
    const navigation = useNavigation<any>();

    const actions = [
        { id: '1', title: 'Orders', icon: ClipboardList, color: '#FF9800', route: 'Orders' },
        { id: '2', title: 'Kitchen View', icon: Monitor, color: '#4CAF50', route: 'KDS' },
        { id: '3', title: 'Menu', icon: FileText, color: '#2196F3', route: 'Menu' },
        { id: '4', title: 'Analytics', icon: BarChart2, color: '#607D8B', route: 'Analytics' },
        { id: '5', title: 'Reviews', icon: Star, color: '#E91E63', route: 'Reviews' },
        { id: '6', title: 'Payouts', icon: DollarSign, color: '#009688', route: 'Financials' },
    ];

    const handlePress = (route: string) => {
        if (route) navigation.navigate(route);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick Actions</Text>
            <View style={styles.grid}>
                {actions.map((action) => (
                    <TouchableOpacity key={action.id} style={styles.card} onPress={() => handlePress(action.route)}>
                        <View style={[styles.iconBg, { backgroundColor: `${action.color}15` }]}>
                            <action.icon size={24} color={action.color} />
                        </View>
                        <Text style={styles.label}>{action.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    card: {
        flex: 1, // Distribute space equally
        minWidth: '45%', // Ensure 2 columns
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    iconBg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    }
});

export default QuickActions;

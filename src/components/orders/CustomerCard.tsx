import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Phone, MapPin } from 'lucide-react-native';

interface CustomerCardProps {
    name: string;
    phone?: string;
    address?: string;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ name, phone, address }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Customer Details</Text>

            <View style={styles.row}>
                <User size={16} color="#666" style={styles.icon} />
                <Text style={styles.text}>{name}</Text>
            </View>

            {phone && (
                <TouchableOpacity style={styles.row}>
                    <Phone size={16} color="#666" style={styles.icon} />
                    <Text style={[styles.text, styles.link]}>{phone}</Text>
                </TouchableOpacity>
            )}

            {address && (
                <View style={styles.row}>
                    <MapPin size={16} color="#666" style={styles.icon} />
                    <Text style={styles.text}>{address}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 16,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 12,
    },
    text: {
        fontSize: 15,
        color: '#1C1C1C',
        flex: 1,
    },
    link: {
        color: '#E23744',
    },
});

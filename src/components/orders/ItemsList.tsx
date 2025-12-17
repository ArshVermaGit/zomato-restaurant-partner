import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Item {
    name: string;
    quantity: number;
    price?: number;
    variant?: string;
}

interface ItemsListProps {
    items: Item[];
}

export const ItemsList: React.FC<ItemsListProps> = ({ items }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Order Items</Text>
            {items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                    <View style={styles.quantityBadge}>
                        <Text style={styles.quantity}>{item.quantity}×</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        {item.variant && <Text style={styles.variant}>{item.variant}</Text>}
                    </View>
                    {item.price && <Text style={styles.price}>₹{item.price * item.quantity}</Text>}
                </View>
            ))}
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
    itemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    quantityBadge: {
        backgroundColor: '#FEF1F2',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 12,
        marginTop: 2,
    },
    quantity: {
        color: '#E23744',
        fontSize: 12,
        fontWeight: 'bold',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 15,
        color: '#1C1C1C',
        fontWeight: '500',
    },
    variant: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    price: {
        fontSize: 15,
        color: '#1C1C1C',
        fontWeight: '500',
    },
});

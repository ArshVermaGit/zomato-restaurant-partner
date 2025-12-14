import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Edit2, Trash2 } from 'lucide-react-native';
import { MenuItem } from '../../store/slices/menuSlice';

interface Props {
    item: MenuItem;
    onToggle: (val: boolean) => void;
    onEdit: () => void;
    onDelete: () => void;
}

const MenuItemCard: React.FC<Props> = ({ item, onToggle, onEdit, onDelete }) => {
    return (
        <View style={[styles.container, !item.isAvailable && styles.unavailable]}>
            <View style={styles.info}>
                <View style={styles.header}>
                    <View style={[styles.vegIcon, item.isVeg ? styles.veg : styles.nonVeg]}>
                        <View style={[styles.vegDot, item.isVeg ? styles.vegDotColor : styles.nonVegDotColor]} />
                    </View>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            </View>

            <View style={styles.actions}>
                <Switch
                    value={item.isAvailable}
                    onValueChange={onToggle}
                    trackColor={{ false: '#767577', true: '#81C784' }}
                    thumbColor={item.isAvailable ? '#4CAF50' : '#f4f3f4'}
                />
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Edit2 size={18} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Trash2 size={18} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        alignItems: 'center',
    },
    unavailable: {
        opacity: 0.6,
        backgroundColor: '#FAFAFA',
    },
    info: {
        flex: 1,
        marginRight: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    vegIcon: {
        width: 14,
        height: 14,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
        borderRadius: 2,
    },
    veg: {
        borderColor: '#2E7D32',
    },
    nonVeg: {
        borderColor: '#D32F2F',
    },
    vegDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    vegDotColor: {
        backgroundColor: '#2E7D32',
    },
    nonVegDotColor: {
        backgroundColor: '#D32F2F',
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1C1C1C',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 2,
    },
    desc: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBtn: {
        padding: 4,
    }
});

export default MenuItemCard;

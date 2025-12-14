import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react-native';
import { MenuCategory as CategoryType } from '../../store/slices/menuSlice';

interface Props {
    category: CategoryType;
    expanded: boolean;
    itemCount: number;
    onToggleExpand: () => void;
    onAddItem: () => void;
}

const MenuCategory: React.FC<Props> = ({ category, expanded, itemCount, onToggleExpand, onAddItem }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={onToggleExpand}>
                <View style={styles.left}>
                    {expanded ? <ChevronDown size={20} color="#333" /> : <ChevronRight size={20} color="#333" />}
                    <Text style={styles.name}>{category.name} ({itemCount})</Text>
                </View>
            </TouchableOpacity>

            {expanded && (
                <TouchableOpacity style={styles.addBtn} onPress={onAddItem}>
                    <Plus size={16} color="#E23744" />
                    <Text style={styles.addText}>Add Item</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingLeft: 44,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    addText: {
        color: '#E23744',
        fontWeight: '600',
        marginLeft: 8,
    }
});

export default MenuCategory;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from '../../store/slices/menuSlice';
import { Check, Square } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface Props {
    item: MenuItem;
    selected: boolean;
    onToggle: () => void;
}

const SelectableMenuItem: React.FC<Props> = ({ item, selected, onToggle }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
            <View style={[styles.checkbox, selected && styles.checked]}>
                {selected ? <Check size={16} color={colors.white} /> : null}
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={[styles.vegIcon, item.isVeg ? styles.veg : styles.nonVeg]}>
                        <View style={[styles.vegInner, item.isVeg ? styles.vegInnerColor : styles.nonVegInnerColor]} />
                    </View>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.status}>{item.isAvailable ? 'Available' : 'Unavailable'}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.gray_300,
        marginRight: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: colors.zomato_red,
        borderColor: colors.zomato_red,
    },
    content: {
        flex: 1,
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
        marginRight: 8,
    },
    veg: {
        borderColor: colors.semantic.success,
    },
    nonVeg: {
        borderColor: colors.semantic.error,
    },
    vegInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    vegInnerColor: {
        backgroundColor: colors.semantic.success,
    },
    nonVegInnerColor: {
        backgroundColor: colors.semantic.error,
    },
    name: {
        ...typography.body_medium,
        fontWeight: '500',
        color: colors.gray_900,
    },
    price: {
        ...typography.caption,
        color: colors.gray_600,
    },
    status: {
        ...typography.caption,
        color: colors.gray_500,
        marginTop: 2,
    }
});

export default SelectableMenuItem;

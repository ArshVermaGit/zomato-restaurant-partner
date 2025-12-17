import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

import { MenuCategory } from '../../store/slices/menuSlice';

interface Props {
    categories: MenuCategory[];
    onReorder: (newOrder: MenuCategory[]) => void;
}

const ReorderCategoryList: React.FC<Props> = ({ categories, onReorder }) => {

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newCategories = [...categories];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newCategories.length) return;

        // Swap
        [newCategories[index], newCategories[targetIndex]] = [newCategories[targetIndex], newCategories[index]];

        onReorder(newCategories);
    };

    return (
        <ScrollView style={styles.container}>
            {categories.map((cat, index) => (
                <View key={cat.id} style={styles.row}>
                    <GripVertical size={20} color={colors.gray_400} style={styles.grip} />
                    <Text style={styles.name}>{cat.name}</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity
                            onPress={() => moveItem(index, 'up')}
                            disabled={index === 0}
                            style={[styles.btn, index === 0 && styles.btnDisabled]}
                        >
                            <ChevronUp size={20} color={index === 0 ? colors.gray_300 : colors.gray_700} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => moveItem(index, 'down')}
                            disabled={index === categories.length - 1}
                            style={[styles.btn, index === categories.length - 1 && styles.btnDisabled]}
                        >
                            <ChevronDown size={20} color={index === categories.length - 1 ? colors.gray_300 : colors.gray_700} />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.gray_200,
        ...shadows.sm,
    },
    grip: {
        marginRight: spacing.md,
    },
    name: {
        ...typography.body_medium,
        color: colors.gray_900,
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    btn: {
        padding: spacing.xs,
        backgroundColor: colors.gray_100,
        borderRadius: borderRadius.sm,
    },
    btnDisabled: {
        opacity: 0.5,
        backgroundColor: colors.gray_50,
    }
});

export default ReorderCategoryList;

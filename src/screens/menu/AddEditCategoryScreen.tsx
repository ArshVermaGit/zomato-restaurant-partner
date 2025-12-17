import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../../store/slices/menuSlice';
import { RestaurantService } from '../../services/api/restaurant';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '@zomato/ui';

const AddEditCategoryScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const dispatch = useDispatch();
    const { mode, categoryId } = route.params || {};

    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!name) return;
        setSaving(true);
        try {
            const catData = {
                id: categoryId || undefined,
                name,
                isVisible: true,
            };

            const savedCat = await RestaurantService.upsertCategory(catData);

            if (mode === 'edit') {
                dispatch(updateCategory(savedCat));
            } else {
                dispatch(addCategory(savedCat));
            }

            navigation.goBack();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{mode === 'edit' ? 'Edit Category' : 'Add Category'}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.label}>Category Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="e.g. Starters"
                    placeholderTextColor={colors.gray_400}
                    autoFocus
                />
            </View>

            <View style={styles.footer}>
                <View style={{ width: '100%' }}>
                    <Button
                        variant="primary"
                        size="large"
                        onPress={handleSave}
                        disabled={saving}
                    >
                        Save Category
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        padding: spacing.md,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        ...typography.h3,
        color: colors.gray_900,
    },
    cancel: {
        ...typography.body_medium,
        color: colors.zomato_red,
    },
    content: {
        padding: spacing.lg,
    },
    label: {
        ...typography.label_small,
        color: colors.gray_700,
        marginBottom: spacing.xs,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray_300,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: 16,
        color: colors.gray_900,
        backgroundColor: colors.white,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.gray_100,
        backgroundColor: colors.white,
    }
});

export default AddEditCategoryScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addItem, updateItem } from '../../store/slices/menuSlice';
import { RestaurantService } from '../../services/api/restaurant';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '@zomato/ui';
import { Camera, X } from 'lucide-react-native';
import VegNonVegSelector from '../../components/menu/VegNonVegSelector';
import ModifierGroupBuilder, { ModifierGroup } from '../../components/menu/ModifierGroupBuilder';

const MOCK_IMAGES = [
    'https://b.zmtcdn.com/data/dish_photos/d2f/2cd30ec12b97afde8607a72bb3aadd2f.jpg',
    'https://b.zmtcdn.com/data/dish_photos/76b/a1955fb4e5c469b4c0926715f333376b.jpg',
    'https://b.zmtcdn.com/data/dish_photos/c55/86177e777f989ad5940428751540ac55.jpg',
];

const AddEditItemScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const dispatch = useDispatch();
    const { mode, itemId, categoryId } = route.params || {};

    const items = useSelector((state: RootState) => state.menu.items);
    const existingItem = itemId ? items[itemId] : null;

    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        isVeg: true,
        isAvailable: true,
        categoryId: categoryId || '',
        image: '',
    });

    const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (mode === 'edit' && existingItem) {
            setForm({
                name: existingItem.name,
                price: existingItem.price.toString(),
                description: existingItem.description,
                isVeg: existingItem.isVeg,
                isAvailable: existingItem.isAvailable,
                categoryId: existingItem.categoryId,
                image: existingItem.image || '',
            });
            // TODO: Load existing modifiers if API supports it
        }
    }, [mode, existingItem]);

    const handleSave = async () => {
        if (!form.name || !form.price) {
            Alert.alert('Error', 'Please enter Item Name and Price');
            return;
        }

        setSubmitting(true);
        try {
            const itemData = {
                id: itemId || undefined,
                name: form.name,
                price: parseFloat(form.price),
                description: form.description,
                isVeg: form.isVeg,
                isAvailable: form.isAvailable,
                categoryId: form.categoryId,
                image: form.image,
                modifiers: modifierGroups,
            };

            const savedItem = await RestaurantService.upsertItem(itemData);

            if (mode === 'edit') {
                dispatch(updateItem(savedItem));
            } else {
                dispatch(addItem(savedItem));
            }

            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save item');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const pickRandomImage = () => {
        const randomImg = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];
        setForm(p => ({ ...p, image: randomImg }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{mode === 'edit' ? 'Edit Item' : 'Add New Item'}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.form}>

                {/* Image Picker */}
                <View style={styles.imageSection}>
                    {form.image ? (
                        <View>
                            <Image source={{ uri: form.image }} style={styles.previewImage} />
                            <TouchableOpacity
                                style={styles.removeImageBtn}
                                onPress={() => setForm(p => ({ ...p, image: '' }))}
                            >
                                <X size={16} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.uploadPlaceholder} onPress={pickRandomImage}>
                            <Camera size={32} color={colors.gray_400} />
                            <Text style={styles.uploadText}>Add Item Photo</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Basic Details */}
                <View>
                    <Text style={styles.label}>Item Name</Text>
                    <TextInput
                        style={styles.input}
                        value={form.name}
                        onChangeText={t => setForm(p => ({ ...p, name: t }))}
                        placeholder="e.g. Butter Chicken"
                        placeholderTextColor={colors.gray_400}
                    />
                </View>

                <View style={styles.row}>
                    <View style={styles.flexField}>
                        <Text style={styles.label}>Price (₹)</Text>
                        <TextInput
                            style={styles.input}
                            value={form.price}
                            onChangeText={t => setForm(p => ({ ...p, price: t }))}
                            keyboardType="numeric"
                            placeholder="250"
                            placeholderTextColor={colors.gray_400}
                        />
                    </View>
                    <View style={styles.fixedWidthField}>
                        <Text style={styles.label}>Type</Text>
                        <VegNonVegSelector
                            isVeg={form.isVeg}
                            onChange={v => setForm(p => ({ ...p, isVeg: v }))}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={form.description}
                        onChangeText={t => setForm(p => ({ ...p, description: t }))}
                        multiline
                        placeholder="Describe the dish..."
                        placeholderTextColor={colors.gray_400}
                    />
                </View>

                {/* Modifiers */}
                <ModifierGroupBuilder
                    groups={modifierGroups}
                    onChange={setModifierGroups}
                />

                <View style={styles.switchRow}>
                    <Text style={styles.label}>Mark as Available</Text>
                    <Switch
                        value={form.isAvailable}
                        onValueChange={v => setForm(p => ({ ...p, isAvailable: v }))}
                        trackColor={{ true: colors.success }}
                        thumbColor={colors.white}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.fullWidthButton}>
                    <Button
                        variant="primary"
                        size="large"
                        onPress={handleSave}
                        disabled={submitting}
                    >
                        {mode === 'edit' ? 'Update Item' : 'Save Item'}
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
    form: {
        padding: spacing.lg,
        gap: spacing.lg,
        paddingBottom: 40,
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.gray_100,
        marginTop: spacing.md,
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    uploadPlaceholder: {
        width: '100%',
        height: 180,
        backgroundColor: colors.gray_50,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.gray_300,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.sm,
    },
    uploadText: {
        color: colors.gray_500,
    },
    previewImage: {
        width: '100%',
        height: 180,
        borderRadius: borderRadius.lg,
        aspectRatio: 16 / 9,
    },
    removeImageBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 6,
        borderRadius: 12,
    },
    footer: {
        padding: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.gray_100,
    },
    flexField: {
        flex: 1,
        marginRight: 16,
    },
    fixedWidthField: {
        width: 140,
    },
    fullWidthButton: {
        width: '100%',
    }
});

export default AddEditItemScreen;

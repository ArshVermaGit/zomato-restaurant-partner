import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addItem, updateItem } from '../../store/slices/menuSlice';
import { RestaurantService } from '../../services/api/restaurant';

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
    });

    useEffect(() => {
        if (mode === 'edit' && existingItem) {
            setForm({
                name: existingItem.name,
                price: existingItem.price.toString(),
                description: existingItem.description,
                isVeg: existingItem.isVeg,
                isAvailable: existingItem.isAvailable,
                categoryId: existingItem.categoryId,
            });
        }
    }, [mode, existingItem]);

    const handleSave = async () => {
        if (!form.name || !form.price) return; // Simple validation

        const itemData = {
            id: itemId || undefined, // undefined for new item
            name: form.name,
            price: parseFloat(form.price),
            description: form.description,
            isVeg: form.isVeg,
            isAvailable: form.isAvailable,
            categoryId: form.categoryId,
        };

        const savedItem = await RestaurantService.upsertItem(itemData);

        if (mode === 'edit') {
            dispatch(updateItem(savedItem));
        } else {
            dispatch(addItem(savedItem));
        }

        navigation.goBack();
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
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                    style={styles.input}
                    value={form.name}
                    onChangeText={t => setForm(p => ({ ...p, name: t }))}
                    placeholder="e.g. Butter Chicken"
                />

                <Text style={styles.label}>Price (₹)</Text>
                <TextInput
                    style={styles.input}
                    value={form.price}
                    onChangeText={t => setForm(p => ({ ...p, price: t }))}
                    keyboardType="numeric"
                    placeholder="250"
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={form.description}
                    onChangeText={t => setForm(p => ({ ...p, description: t }))}
                    multiline
                />

                <View style={styles.row}>
                    <Text style={styles.label}>Vegetarian</Text>
                    <Switch
                        value={form.isVeg}
                        onValueChange={v => setForm(p => ({ ...p, isVeg: v }))}
                        trackColor={{ false: '#767577', true: '#81C784' }}
                        thumbColor={form.isVeg ? '#4CAF50' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Available</Text>
                    <Switch
                        value={form.isAvailable}
                        onValueChange={v => setForm(p => ({ ...p, isAvailable: v }))}
                        trackColor={{ true: '#81C784' }}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Item</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 16,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancel: {
        color: '#E23744',
        fontSize: 16,
    },
    form: {
        padding: 16,
        gap: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    saveBtn: {
        backgroundColor: '#E23744',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default AddEditItemScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../../store/slices/menuSlice';
import { RestaurantService } from '../../services/api/restaurant';

const AddEditCategoryScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const dispatch = useDispatch();
    const { mode, categoryId } = route.params || {};

    const [name, setName] = useState('');

    const handleSave = async () => {
        if (!name) return;

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
                    autoFocus
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Category</Text>
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
    content: {
        padding: 24,
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
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
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

export default AddEditCategoryScreen;

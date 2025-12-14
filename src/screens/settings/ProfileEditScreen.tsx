import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateRestaurantDetails } from '../../store/slices/restaurantSlice';
import { RestaurantService } from '../../services/api/restaurant';

const ProfileEditScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const currentRestaurant = useSelector((state: RootState) => state.restaurant.currentRestaurant);

    const [name, setName] = useState(currentRestaurant?.name || '');
    const [address, setAddress] = useState(currentRestaurant?.address || '');
    const [desc, setDesc] = useState(currentRestaurant?.description || '');

    const handleSave = async () => {
        if (currentRestaurant) {
            const updates = { name, address, description: desc };
            dispatch(updateRestaurantDetails({ id: currentRestaurant.id, data: updates }));
            await RestaurantService.updateSettings(currentRestaurant.id, updates);
            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack();
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Edit Profile</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Restaurant Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={desc}
                        onChangeText={setDesc}
                        multiline
                        numberOfLines={3}
                        placeholder="Tell customers about your place..."
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={address}
                        onChangeText={setAddress}
                        multiline
                    />
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    form: {
        padding: 16,
    },
    inputGroup: {
        marginBottom: 20,
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
    saveBtn: {
        backgroundColor: '#E23744',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ProfileEditScreen;

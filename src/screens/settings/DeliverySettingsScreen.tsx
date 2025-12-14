import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';

const DeliverySettingsScreen = ({ navigation }: any) => {
    const [radius, setRadius] = useState('5');
    const [minOrder, setMinOrder] = useState('150');
    const [acceptingOrders, setAcceptingOrders] = useState(true);

    const handleSave = () => {
        Alert.alert('Success', 'Delivery settings updated');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Delivery Settings</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.label}>Accepting Orders</Text>
                    <Switch
                        value={acceptingOrders}
                        onValueChange={setAcceptingOrders}
                        trackColor={{ false: '#EEE', true: '#4CAF50' }}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Delivery Radius (km)</Text>
                    <TextInput
                        style={styles.input}
                        value={radius}
                        onChangeText={setRadius}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Min Order Value (₹)</Text>
                    <TextInput
                        style={styles.input}
                        value={minOrder}
                        onChangeText={setMinOrder}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { padding: 16, paddingTop: 50, borderBottomWidth: 1, borderColor: '#EEE' },
    title: { fontSize: 20, fontWeight: 'bold' },
    content: { padding: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#444' },
    input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 16 },
    saveBtn: { backgroundColor: '#E23744', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    saveText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});

export default DeliverySettingsScreen;

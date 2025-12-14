import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const OperatingHoursScreen = ({ navigation }: any) => {
    const [hours, setHours] = useState(
        DAYS.map(day => ({ day, isOpen: true, time: '10:00 AM - 11:00 PM' }))
    );

    const toggleDay = (index: number) => {
        const newHours = [...hours];
        newHours[index].isOpen = !newHours[index].isOpen;
        setHours(newHours);
    };

    const handleSave = () => {
        // Here we would dispatch updateRestaurantDetails with new hours
        Alert.alert('Success', 'Operating hours updated');
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Operating Hours</Text>
            </View>

            <View style={styles.list}>
                {hours.map((item, index) => (
                    <View key={item.day} style={styles.row}>
                        <View>
                            <Text style={styles.day}>{item.day}</Text>
                            <Text style={styles.time}>{item.isOpen ? item.time : 'Closed'}</Text>
                        </View>
                        <Switch
                            value={item.isOpen}
                            onValueChange={() => toggleDay(index)}
                            trackColor={{ false: '#EEE', true: '#E23744' }}
                        />
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save Hours</Text>
            </TouchableOpacity>
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
    list: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    day: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    time: {
        fontSize: 14,
        color: '#666',
    },
    saveBtn: {
        backgroundColor: '#E23744',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default OperatingHoursScreen;

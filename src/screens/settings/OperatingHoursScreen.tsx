import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing } from '../../theme';
import DayScheduleRow from '../../components/settings/DayScheduleRow';

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

    const handleTimePress = (index: number) => {
        // Mock time picker interaction
        Alert.alert('Edit Time', `Set opening hours for ${hours[index].day}`);
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

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Set your general operating hours. You can adjust specific timings for holidays in Holiday Settings.</Text>
            </View>

            <View style={styles.list}>
                {hours.map((item, index) => (
                    <DayScheduleRow
                        key={item.day}
                        day={item.day}
                        isOpen={item.isOpen}
                        time={item.time}
                        onToggle={() => toggleDay(index)}
                        onTimePress={() => handleTimePress(index)}
                    />
                ))}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Hours</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray_50,
    },
    header: {
        padding: spacing.md,
        paddingTop: 50,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.gray_900,
    },
    infoBox: {
        padding: spacing.md,
        backgroundColor: colors.primary.zomato_red_tint,
        margin: spacing.md,
        borderRadius: 8,
    },
    infoText: {
        color: colors.zomato_red,
        fontSize: 12,
        lineHeight: 18,
    },
    list: {
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.gray_200,
    },
    footer: {
        padding: spacing.md,
    },
    saveBtn: {
        backgroundColor: colors.zomato_red,
        padding: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default OperatingHoursScreen;

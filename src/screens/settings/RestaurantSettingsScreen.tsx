import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { colors, spacing } from '../../theme';
import SettingsSection from '../../components/settings/SettingsSection';
import MenuItem from '../../components/settings/MenuItem';

const RestaurantSettingsScreen = ({ navigation }: any) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <SettingsSection title="Restaurant Details">
                <MenuItem
                    label="Basic Information"
                    onPress={() => navigation.navigate('ProfileEdit')}
                />
                <MenuItem
                    label="Operating Hours"
                    onPress={() => navigation.navigate('OperatingHours')}
                />
                <MenuItem
                    label="Delivery Settings"
                    onPress={() => { }}
                    isLast
                />
            </SettingsSection>

            <SettingsSection title="Menu">
                <MenuItem
                    label="Menu Management"
                    onPress={() => navigation.navigate('Menu')}
                />
                <MenuItem
                    label="Item Availability"
                    onPress={() => { }}
                    isLast
                />
            </SettingsSection>

            <SettingsSection title="Staff">
                <MenuItem
                    label="Manage Staff"
                    badge="3 Active"
                    onPress={() => navigation.navigate('StaffManagement')}
                    isLast
                />
            </SettingsSection>

            <SettingsSection title="Documents">
                <MenuItem
                    label="FSSAI License"
                    badge="Verified"
                    onPress={() => { }}
                />
                <MenuItem
                    label="GST Certificate"
                    onPress={() => { }}
                    isLast
                />
            </SettingsSection>

            <View style={styles.footer}>
                <Text style={styles.version}>App Version 2.4.0</Text>
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
        marginBottom: spacing.md,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.gray_900,
    },
    footer: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    version: {
        color: colors.gray_400,
        fontSize: 12,
    }
});

export default RestaurantSettingsScreen;

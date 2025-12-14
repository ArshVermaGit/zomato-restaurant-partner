import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileEditScreen from '../screens/settings/ProfileEditScreen';
import StaffManagementScreen from '../screens/settings/StaffManagementScreen';
import OperatingHoursScreen from '../screens/settings/OperatingHoursScreen';
import DeliverySettingsScreen from '../screens/settings/DeliverySettingsScreen';

const Stack = createStackNavigator();

export const SettingsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SettingsMenu" component={SettingsScreen} />
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
            <Stack.Screen name="StaffManagement" component={StaffManagementScreen} />
            <Stack.Screen name="OperatingHours" component={OperatingHoursScreen} />
            <Stack.Screen name="DeliverySettings" component={DeliverySettingsScreen} />
        </Stack.Navigator>
    );
};

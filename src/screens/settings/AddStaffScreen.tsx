import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../theme';
import RolePicker from '../../components/settings/RolePicker';
import { PermissionsSection, PermissionToggle } from '../../components/settings/PermissionsSection';
import { useDispatch } from 'react-redux';
import { addStaffMember } from '../../store/slices/staffSlice';
import { RestaurantService } from '../../services/api/restaurant';

const AddStaffScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Cashier');

    // Permissions State
    const [manageOrders, setManageOrders] = useState(true);
    const [manageMenu, setManageMenu] = useState(false);
    const [viewAnalytics, setViewAnalytics] = useState(false);

    const handleSendInvitation = async () => {
        if (!name || !phone) return;

        const newStaff = {
            name,
            role,
            phone,
            email,
            permissions: { manageOrders, manageMenu, viewAnalytics }
        };

        await RestaurantService.addStaff('REST-001', newStaff);
        // @ts-ignore
        dispatch(addStaffMember({ ...newStaff, id: Date.now().toString(), status: 'ACTIVE' }));
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Add New Staff</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="e.g. John Doe"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+91 99999 99999"
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="john@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <RolePicker
                    roles={['Manager', 'Chef', 'Cashier', 'Waiter']}
                    selectedRole={role}
                    onSelect={setRole}
                />

                <PermissionsSection>
                    <PermissionToggle
                        label="Manage Orders"
                        value={manageOrders}
                        onToggle={setManageOrders}
                    />
                    <PermissionToggle
                        label="Manage Menu"
                        value={manageMenu}
                        onToggle={setManageMenu}
                    />
                    <PermissionToggle
                        label="View Analytics"
                        value={viewAnalytics}
                        onToggle={setViewAnalytics}
                    />
                </PermissionsSection>

                <TouchableOpacity style={styles.button} onPress={handleSendInvitation}>
                    <Text style={styles.buttonText}>Send Invitation</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.gray_900,
    },
    form: {
        padding: spacing.md,
    },
    inputGroup: {
        marginBottom: spacing.md,
    },
    label: {
        ...typography.body_small,
        fontWeight: '600',
        color: colors.gray_700,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray_300,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: 16,
        color: colors.gray_900,
    },
    button: {
        backgroundColor: colors.zomato_red,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.xl,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default AddStaffScreen;

import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { colors, spacing } from '../../theme';
import SettingsSection from '../../components/settings/SettingsSection';
import MenuItem from '../../components/settings/MenuItem';

import { useCreateAdHocPaymentMutation, useVerifyPaymentMutation } from '../../services/api/paymentsApi';
import RazorpayCheckout from 'react-native-razorpay';
import { Alert } from 'react-native';

const RestaurantSettingsScreen = ({ navigation }: any) => {
    const [initiateAdHoc, { isLoading: isPaying }] = useCreateAdHocPaymentMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    const handlePromote = async () => {
        try {
            const amount = 1999;
            const paymentData = await initiateAdHoc({ amount, purpose: 'AD_BOOST' }).unwrap();

            const options = {
                description: 'Boost Visibility (7 Days)',
                image: 'https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png',
                currency: paymentData.currency,
                key: paymentData.key,
                amount: paymentData.amount,
                name: 'Zomato Ads',
                order_id: paymentData.id,
                theme: { color: '#E23744' }
            };

            RazorpayCheckout.open(options).then(async (data: any) => {
                await verifyPayment({
                    paymentId: data.razorpay_payment_id,
                    razorpayOrderId: data.razorpay_order_id,
                    signature: data.razorpay_signature
                }).unwrap();
                Alert.alert('Success', 'Promotion Activated!');
            }).catch((err: any) => {
                console.error(err);
                Alert.alert('Failed', 'Payment Cancelled');
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not initiate promotion');
        }
    };
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

            <SettingsSection title="Promotions">
                <MenuItem
                    label={isPaying ? "Processing..." : "Boost Visibility"}
                    badge="₹1999"
                    onPress={handlePromote}
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthService } from '../../services/api/auth';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (phoneNumber.length < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);
        try {
            // For Demo: Direct login instead of OTP flow
            await AuthService.login(phoneNumber);
            // Navigation handled by RootNavigator based on Redux state
        } catch (error) {
            Alert.alert('Error', 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Zomato for Business</Text>
                <Text style={styles.subtitle}>Manage your restaurant efficiently</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Log in with your Mobile Number</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.prefix}>+91</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Mobile Number"
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        editable={!loading}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Continue</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.terms}>
                    By continuing, you agree to our Terms of Service Policy.
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 48,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 12,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 12,
        marginBottom: 24,
    },
    prefix: {
        fontSize: 16,
        color: '#333',
        marginRight: 8,
        fontWeight: '600',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        height: '100%',
    },
    button: {
        backgroundColor: '#236161', // Zomato Business Green (approx) or use Red #E23744
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    terms: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginTop: 16,
    }
});

export default LoginScreen;

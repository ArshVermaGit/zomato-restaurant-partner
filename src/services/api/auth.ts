import apiClient from './axiosInstance';
import { store } from '../../store';
import { loginSuccess, logout } from '../../store/slices/authSlice';

export const AuthService = {
    sendOtp: async (phoneNumber: string) => {
        const response = await apiClient.post('/auth/send-otp', { phone: phoneNumber, role: 'restaurant' });
        return response.data;
    },

    verifyOtp: async (phoneNumber: string, otp: string) => {
        const response = await apiClient.post('/auth/verify-otp', { phone: phoneNumber, otp, role: 'restaurant' });
        return response.data;
    },

    login: async (phoneNumber: string) => {
        try {
            // Using password for dev/demo simplicity or direct login if needed
            const response = await apiClient.post('/auth/login', { phoneNumber, password: 'password', role: 'restaurant' });
            const { user, token } = response.data;
            store.dispatch(loginSuccess({ user, token }));
            return user;
        } catch (error) {
            console.error('Login Failed', error);
            throw error;
        }
    },

    logout: async () => {
        await apiClient.post('/auth/logout');
        store.dispatch(logout());
    }
};

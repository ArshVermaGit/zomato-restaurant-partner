import { AuthService as ApiAuthService } from '@zomato/api-client';
import { store } from '../../store';
import { loginSuccess, logout } from '../../store/slices/authSlice';

export const AuthService = {
    sendOtp: async (phoneNumber: string) => {
        try {
            // isLogin: true/false depending on context? Assuming login for now or generic
            const response = await ApiAuthService.sendOtp({ phoneNumber, isLogin: true });
            return response;
        } catch (error) {
            console.error('Send OTP Failed', error);
            throw error;
        }
    },

    verifyOtp: async (phoneNumber: string, otp: string) => {
        try {
            const response = await ApiAuthService.verifyOtp({ phoneNumber, otp });
            if (response.token) {
                store.dispatch(loginSuccess({ user: response.user, token: response.token }));
            }
            return response;
        } catch (error) {
            console.error('Verify OTP Failed', error);
            throw error;
        }
    },

    login: async (phoneNumber: string) => {
        try {
            // Using password for dev/demo simplicity or direct login if needed
            const response = await ApiAuthService.login({ phoneNumber, password: 'password' });
            // Adapt response if needed
            if (response.access_token) {
                store.dispatch(loginSuccess({ user: { phoneNumber, id: 'unknown' }, token: response.access_token }));
                return { phoneNumber };
            }
            return response;
        } catch (error) {
            console.error('Login Failed', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await ApiAuthService.logout();
            store.dispatch(logout());
        } catch (error) {
            console.error('Logout Failed', error);
            store.dispatch(logout());
        }
    }
};

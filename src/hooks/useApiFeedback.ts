import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { ApiError } from '../services/api/api.types';

/**
 * Standardized feedback hook for Restaurant Partner.
 */
export const useApiFeedback = (options: {
    error?: any;
    isSuccess?: boolean;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}) => {
    const { error, isSuccess, successMessage, errorMessage, onSuccess, onError } = options;

    useEffect(() => {
        if (isSuccess) {
            if (successMessage) {
                Toast.show({ type: 'success', text1: 'Success', text2: successMessage });
            }
            onSuccess?.();
        }
    }, [isSuccess, successMessage, onSuccess]);

    useEffect(() => {
        if (error) {
            const apiError = error as ApiError;
            const displayMessage = errorMessage || apiError.message || 'Something went wrong';
            Toast.show({ type: 'error', text1: 'Error', text2: displayMessage });
            onError?.(apiError);
        }
    }, [error, errorMessage, onError]);
};

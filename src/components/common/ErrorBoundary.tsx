import React, { ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme';
import { AlertTriangle, RefreshCcw } from 'lucide-react-native';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Global Error Boundary for Restaurant Partner app.
 */
export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Restaurant App Crash caught by ErrorBoundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <AlertTriangle size={48} color={colors.primary.zomato_red} />
                        </View>
                        <Text style={styles.title}>Something went wrong</Text>
                        <Text style={styles.message}>
                            We encountered an error. Please try again or contact support if the issue persists.
                        </Text>

                        {__DEV__ && (
                            <ScrollView style={styles.debugContainer}>
                                <Text style={styles.debugText}>{this.state.error?.toString()}</Text>
                            </ScrollView>
                        )}

                        <TouchableOpacity style={styles.button} onPress={this.handleReset}>
                            <RefreshCcw size={20} color={colors.secondary.white} />
                            <Text style={styles.buttonText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary.white,
        justifyContent: 'center',
        padding: spacing.xl,
    },
    content: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary.zomato_red + '10',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.h3,
        color: colors.secondary.gray_900,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    message: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary.zomato_red,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    buttonText: {
        ...typography.label_medium,
        color: colors.secondary.white,
        fontWeight: '700',
    },
    debugContainer: {
        maxHeight: 200,
        backgroundColor: colors.secondary.gray_100,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginBottom: spacing.xl,
        width: '100%',
    },
    debugText: {
        ...typography.caption,
        color: colors.primary.zomato_red,
        fontFamily: 'Courier',
    },
});

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { ChefHat } from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme'; // Using relative path to be safe if alias fails

import { useNavigation } from '@react-navigation/native';

export const RestaurantSplashScreen = () => {
    const navigation = useNavigation<any>();
    const logoScale = useSharedValue(0);
    const logoRotate = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        // Logo animation
        logoScale.value = withSequence(
            withSpring(1.2, { damping: 10 }),
            withSpring(1, { damping: 15 })
        );
        logoRotate.value = withTiming(360, { duration: 800 });
        opacity.value = withTiming(1, { duration: 400 });

        const timer = setTimeout(() => {
            navigation.replace('Onboarding');
        }, 2500);
        return () => clearTimeout(timer);
    }, [logoRotate, logoScale, navigation, opacity]);

    const logoStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: logoScale.value },
            { rotate: `${logoRotate.value}deg` }
        ],
        opacity: opacity.value,
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, logoStyle]}>
                <View style={styles.logoCircle}>
                    <ChefHat size={56} color={colors.secondary.white} strokeWidth={2} />
                </View>
            </Animated.View>

            <Text style={styles.appName}>Zomato Restaurant Partner</Text>
            <Text style={styles.tagline}>Manage Your Restaurant</Text>

            <Text style={styles.bottomText}>
                Real-time orders • Menu management • Analytics
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary.zomato_red,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    logoContainer: {
        marginBottom: spacing.xl,
    },
    logoCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    appName: {
        ...typography.h2,
        color: colors.secondary.white,
        fontWeight: '700',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    tagline: {
        ...typography.body_large, // Fixed typo
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
    bottomText: {
        position: 'absolute',
        bottom: spacing['2xl'], // Fixed spacing
        ...typography.caption,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
});

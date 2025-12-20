import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Package, FileText, TrendingUp } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@zomato/ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Pagination dots for MVP
// const AnimatedDot = ({ index, scrollX }: { index: number, scrollX: SharedValue<number> }) => {
//     return <View style={[styles.dot, { opacity: 1 }]} />;
// };

export const RestaurantOnboardingScreen = () => {
    const navigation = useNavigation<any>();
    const scrollX = useSharedValue(0);

    const handleSkip = () => {
        navigation.replace('RestaurantSelection'); // Navigate to main auth flow
    };

    const handleGetStarted = () => {
        navigation.replace('RestaurantSelection');
    };

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const slides = [
        {
            id: 1,
            title: 'Manage Orders Efficiently',
            description: 'Accept, prepare and track orders in real-time from one dashboard',
            illustration: require('../../assets/restaurant_onboard1.png'),
            color: '#FFF5E5',
            icon: <Package size={32} color={colors.primary.zomato_red} />,
        },
        {
            id: 2,
            title: 'Update Menu Instantly',
            description: 'Add items, change prices, and manage availability on the go',
            illustration: require('../../assets/restaurant_onboard2.png'),
            color: '#E8FFE5',
            icon: <FileText size={32} color={colors.semantic.success} />,
        },
        {
            id: 3,
            title: 'Track Your Performance',
            description: 'Get detailed insights on sales, ratings and customer feedback',
            illustration: require('../../assets/restaurant_onboard3.png'),
            color: '#E5F0FF',
            icon: <TrendingUp size={32} color={colors.semantic.info} />,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                {slides.map((slide) => (
                    <View key={slide.id} style={styles.slide}>
                        <View style={[styles.iconBadge, { backgroundColor: slide.color }]}>
                            {slide.icon}
                        </View>

                        <Image source={slide.illustration} style={styles.illustration} />

                        <View style={styles.content}>
                            <Text style={styles.title}>{slide.title}</Text>
                            <Text style={styles.description}>{slide.description}</Text>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>

            {/* Basic Pagination for MVP */}
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View key={index} style={[styles.dot, styles.dotInactive]} />
                ))}
            </View>

            <View style={styles.bottomAction}>
                <Button
                    variant="primary"
                    size="large" // Fixed size prop
                    fullWidth
                    onPress={handleGetStarted}
                >
                    Get Started
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondary.white },
    skipButton: { position: 'absolute', top: spacing.lg, right: spacing.md, zIndex: 10, padding: spacing.sm },
    skipText: { ...typography.caption, color: colors.secondary.gray_600, fontWeight: '600' },
    slide: { width: SCREEN_WIDTH, flex: 1, alignItems: 'center', paddingTop: spacing['2xl'], paddingHorizontal: spacing.xl }, // Fixed spacing['2xl']
    iconBadge: { width: 80, height: 80, borderRadius: borderRadius.xl, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
    illustration: { width: SCREEN_WIDTH * 0.7, height: SCREEN_WIDTH * 0.7, resizeMode: 'contain', marginBottom: spacing.xl },
    content: { alignItems: 'center' },
    title: { ...typography.h2, color: colors.secondary.gray_900, textAlign: 'center', marginBottom: spacing.sm },
    description: { ...typography.body_medium, color: colors.secondary.gray_600, textAlign: 'center', lineHeight: 24 }, // Fixed typography
    pagination: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.xl },
    dot: { width: 8, height: 8, borderRadius: 4 },
    dotInactive: { backgroundColor: colors.primary.zomato_red, opacity: 0.5 },
    bottomAction: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xl },
});

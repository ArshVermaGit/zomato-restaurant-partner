import { Vibration, LayoutAnimation, UIManager, Platform } from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export const RestaurantAnimations = {
    orderAccepted: () => {
        // Haptic feedback
        Vibration.vibrate(50);

        // In a real app with reanimated, we would trigger a confetti component here
        // For now, we can just ensure the UI update is smooth
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    },

    statusChanged: () => {
        // Smooth transition for status changes
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        Vibration.vibrate(20);
    },

    menuItemAdded: () => {
        // List item insertion animation
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    },

    deleted: () => {
        LayoutAnimation.configureNext({
            duration: 300,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'spring', springDamping: 0.4 },
            delete: { type: 'linear', property: 'opacity' }
        });
    }
};

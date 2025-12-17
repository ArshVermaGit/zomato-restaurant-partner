import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface Props {
    isVeg: boolean;
    onChange: (isVeg: boolean) => void;
}

const VegNonVegSelector: React.FC<Props> = ({ isVeg, onChange }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.option,
                    isVeg && styles.selectedVeg
                ]}
                onPress={() => onChange(true)}
            >
                <View style={[styles.dot, { borderColor: colors.success, backgroundColor: isVeg ? colors.success : 'transparent' }]} />
                <Text style={[styles.text, isVeg && styles.selectedText]}>Veg</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.option,
                    !isVeg && styles.selectedNonVeg
                ]}
                onPress={() => onChange(false)}
            >
                <View style={[styles.dot, { borderColor: colors.error, backgroundColor: !isVeg ? colors.error : 'transparent' }]} />
                <Text style={[styles.text, !isVeg && styles.selectedText]}>Non-Veg</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.gray_100,
        borderRadius: borderRadius.lg,
        padding: 4,
        height: 44,
    },
    option: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.md,
        gap: spacing.sm,
    },
    selectedVeg: {
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    selectedNonVeg: {
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    dot: {
        width: 12,
        height: 12,
        borderWidth: 2,
        borderRadius: 2, // Square for dot symbol usually, but let's make it look like the Indian veg/non-veg mark
    },
    text: {
        ...typography.label_medium,
        color: colors.gray_600,
    },
    selectedText: {
        color: colors.gray_900,
        fontWeight: 'bold',
    }
});

export default VegNonVegSelector;

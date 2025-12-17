import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface Props {
    options: { id: string; label: string }[];
    selected: string;
    onSelect: (id: string) => void;
}

const FilterChips: React.FC<Props> = ({ options, selected, onSelect }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {options.map((opt) => (
                <TouchableOpacity
                    key={opt.id}
                    style={[styles.chip, selected === opt.id && styles.activeChip]}
                    onPress={() => onSelect(opt.id)}
                >
                    <Text style={[styles.text, selected === opt.id && styles.activeText]}>
                        {opt.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
        flexGrow: 0,
    },
    chip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.xl, // Pill shape
        borderWidth: 1,
        borderColor: colors.gray_200,
        backgroundColor: colors.white,
        marginRight: spacing.sm,
    },
    activeChip: {
        backgroundColor: colors.gray_900,
        borderColor: colors.gray_900,
    },
    text: {
        ...typography.caption,
        fontWeight: '600',
        color: colors.gray_600,
    },
    activeText: {
        color: colors.white,
    }
});

export default FilterChips;

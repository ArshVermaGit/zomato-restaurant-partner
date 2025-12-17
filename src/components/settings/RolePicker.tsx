import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface Props {
    roles: string[];
    selectedRole: string;
    onSelect: (role: string) => void;
}

const RolePicker: React.FC<Props> = ({ roles, selectedRole, onSelect }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Role</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {roles.map((role) => {
                    const isSelected = role === selectedRole;
                    return (
                        <TouchableOpacity
                            key={role}
                            style={[styles.chip, isSelected && styles.selectedChip]}
                            onPress={() => onSelect(role)}
                        >
                            <Text style={[styles.text, isSelected && styles.selectedText]}>
                                {role}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    label: {
        ...typography.body_small,
        fontWeight: '600',
        color: colors.gray_700,
        marginBottom: spacing.sm,
    },
    scroll: {
        gap: spacing.sm,
    },
    chip: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: colors.gray_100,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedChip: {
        backgroundColor: colors.primary.zomato_red_tint,
        borderColor: colors.zomato_red,
    },
    text: {
        ...typography.body_medium,
        color: colors.gray_600,
    },
    selectedText: {
        color: colors.zomato_red,
        fontWeight: '600',
    }
});

export default RolePicker;

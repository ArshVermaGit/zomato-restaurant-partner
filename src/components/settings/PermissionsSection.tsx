import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface PermissionToggleProps {
    label: string;
    value: boolean;
    onToggle: (val: boolean) => void;
}

export const PermissionToggle: React.FC<PermissionToggleProps> = ({ label, value, onToggle }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: colors.gray_200, true: colors.zomato_red }}
            thumbColor={colors.white}
        />
    </View>
);

interface SectionProps {
    children: React.ReactNode;
}

export const PermissionsSection: React.FC<SectionProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Permissions</Text>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.md,
        marginBottom: spacing.lg,
    },
    header: {
        ...typography.body_small,
        fontWeight: '600',
        color: colors.gray_700,
        marginBottom: spacing.sm,
    },
    content: {
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray_200,
        paddingHorizontal: spacing.md,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    label: {
        ...typography.body_medium,
        color: colors.gray_900,
    }
});

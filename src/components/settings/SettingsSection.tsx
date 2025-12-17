import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface Props {
    title: string;
    children: ReactNode;
}

const SettingsSection: React.FC<Props> = ({ title, children }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.h4,
        color: colors.gray_900,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    content: {
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.gray_200,
    }
});

export default SettingsSection;

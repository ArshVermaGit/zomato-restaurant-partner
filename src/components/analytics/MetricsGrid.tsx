import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme';

interface Props {
    children: React.ReactNode;
}

const MetricsGrid: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.grid}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    }
});

export default MetricsGrid;

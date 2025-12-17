import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';

interface Props {
    selectedCount: number;
    onMarkAvailable: () => void;
    onMarkUnavailable: () => void;
    onDelete: () => void;
}

const BulkActionsBar: React.FC<Props> = ({ selectedCount, onMarkAvailable, onMarkUnavailable, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.countText}>{selectedCount} items selected</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={[styles.btn, styles.availableBtn]} onPress={onMarkAvailable}>
                    <Text style={styles.btnText}>Avail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.unavailableBtn]} onPress={onMarkUnavailable}>
                    <Text style={styles.btnText}>Unavail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={onDelete}>
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray_200,
        padding: spacing.md,
        paddingBottom: spacing.xl,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        marginBottom: spacing.sm,
    },
    countText: {
        fontWeight: 'bold',
        color: colors.gray_800,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    btn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    availableBtn: {
        backgroundColor: colors.semantic.success,
    },
    unavailableBtn: {
        backgroundColor: colors.gray_500,
    },
    deleteBtn: {
        backgroundColor: colors.semantic.error,
    },
    btnText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 14,
    }
});

export default BulkActionsBar;

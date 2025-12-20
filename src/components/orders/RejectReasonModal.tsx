import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { X, AlertCircle } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '@zomato/ui';

interface Props {
    visible: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

const REASONS = [
    'Item out of stock',
    'Kitchen too busy',
    'Restaurant closing soon',
    'Cannot fulfill special request',
    'Delivery partner issue',
];

const RejectReasonModal: React.FC<Props> = ({ visible, onClose, onConfirm }) => {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [customReason, setCustomReason] = useState('');

    const handleConfirm = () => {
        if (selectedReason) {
            onConfirm(selectedReason);
        } else if (customReason) {
            onConfirm(customReason);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Reject Order</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color={colors.gray_600} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.warningBox}>
                        <AlertCircle size={20} color={colors.warning} />
                        <Text style={styles.warningText}>
                            Rejecting orders may affect your restaurant rating.
                        </Text>
                    </View>

                    <Text style={styles.subtitle}>Select a reason for rejection:</Text>

                    <View style={styles.list}>
                        {REASONS.map((reason) => (
                            <TouchableOpacity
                                key={reason}
                                style={[
                                    styles.reasonOption,
                                    selectedReason === reason && styles.selectedOption
                                ]}
                                onPress={() => {
                                    setSelectedReason(reason);
                                    setCustomReason('');
                                }}
                            >
                                <View style={[
                                    styles.radio,
                                    selectedReason === reason && styles.radioSelected
                                ]} />
                                <Text style={styles.reasonText}>{reason}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.customInputContainer}>
                        <Text style={styles.customLabel}>Other Reason</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type reason here..."
                            value={customReason}
                            onChangeText={(text) => {
                                setCustomReason(text);
                                setSelectedReason(null);
                            }}
                            multiline
                        />
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.buttonWrapper}>
                            <Button
                                variant="secondary"
                                size="large"
                                onPress={handleConfirm}
                                disabled={!selectedReason && !customReason}
                            >
                                <Text style={styles.buttonText}>Reject Order</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: spacing.base,
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        ...shadows.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        ...typography.h3,
        color: colors.gray_900,
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.warning_light,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.lg,
    },
    warningText: {
        ...typography.caption,
        color: colors.warning,
        flex: 1,
    },
    subtitle: {
        ...typography.body_medium,
        color: colors.gray_600,
        marginBottom: spacing.md,
    },
    list: {
        marginBottom: spacing.lg,
    },
    reasonOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    selectedOption: {
        backgroundColor: colors.gray_50,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.gray_400,
        marginRight: spacing.md,
    },
    radioSelected: {
        borderColor: colors.zomato_red,
        backgroundColor: colors.zomato_red,
    },
    reasonText: {
        ...typography.body_medium,
        color: colors.gray_800,
    },
    customInputContainer: {
        marginBottom: spacing.xl,
    },
    customLabel: {
        ...typography.caption,
        color: colors.gray_600,
        marginBottom: spacing.xs,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray_300,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        fontSize: 14,
        color: colors.gray_900,
        minHeight: 80,
    },
    footer: {
        marginTop: spacing.sm,
    },
    buttonWrapper: {
        width: '100%',
        borderColor: colors.error,
    },
    buttonText: {
        color: colors.error,
    }
});

export default RejectReasonModal;

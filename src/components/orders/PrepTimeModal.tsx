import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '@zomato/ui';

interface Props {
    visible: boolean;
    onClose: () => void;
    onConfirm: (minutes: number) => void;
}

const PRESET_TIMES = [10, 15, 20, 30, 45, 60];

const PrepTimeModal: React.FC<Props> = ({ visible, onClose, onConfirm }) => {
    const [selectedTime, setSelectedTime] = useState<number | null>(15);
    const [customTime, setCustomTime] = useState('');

    const handleConfirm = () => {
        if (selectedTime) {
            onConfirm(selectedTime);
        } else if (customTime) {
            const time = parseInt(customTime, 10);
            if (!isNaN(time) && time > 0) {
                onConfirm(time);
            }
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Preparation Time</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color={colors.gray_600} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitle}>How long will it take to prepare this order?</Text>

                    <View style={styles.grid}>
                        {PRESET_TIMES.map((time) => (
                            <TouchableOpacity
                                key={time}
                                style={[
                                    styles.timeOption,
                                    selectedTime === time && styles.selectedOption
                                ]}
                                onPress={() => {
                                    setSelectedTime(time);
                                    setCustomTime('');
                                }}
                            >
                                <Text style={[
                                    styles.timeText,
                                    selectedTime === time && styles.selectedTimeText
                                ]}>
                                    {time} mins
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.customInputContainer}>
                        <Text style={styles.customLabel}>Custom time (mins)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            placeholder="e.g. 25"
                            value={customTime}
                            onChangeText={(text) => {
                                setCustomTime(text);
                                setSelectedTime(null);
                            }}
                        />
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.buttonWrapper}>
                            <Button
                                variant="primary"
                                size="large"
                                onPress={handleConfirm}
                                disabled={!selectedTime && !customTime}
                            >
                                Confirm & Accept
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
    subtitle: {
        ...typography.body_medium,
        color: colors.gray_600,
        marginBottom: spacing.lg,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    timeOption: {
        width: '30%',
        paddingVertical: spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray_300,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.gray_50,
    },
    selectedOption: {
        borderColor: colors.zomato_red,
        backgroundColor: colors.zomato_red_tint,
    },
    timeText: {
        ...typography.label_medium,
        color: colors.gray_800,
    },
    selectedTimeText: {
        color: colors.zomato_red,
        fontWeight: '700',
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
        fontSize: 16,
        color: colors.gray_900,
    },
    footer: {
        marginTop: spacing.sm,
    },
    buttonWrapper: {
        width: '100%',
    }
});

export default PrepTimeModal;

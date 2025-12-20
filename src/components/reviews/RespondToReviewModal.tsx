import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '@zomato/ui';
import { X } from 'lucide-react-native';
import { Review } from '../../store/slices/reviewsSlice';

interface Props {
    visible: boolean;
    review: Review | null;
    onClose: () => void;
    onSubmit: (text: string) => void;
}

const RespondToReviewModal: React.FC<Props> = ({ visible, review, onClose, onSubmit }) => {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!text.trim()) return;
        onSubmit(text);
        setText('');
        onClose();
    };

    if (!review) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.overlay}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Respond to Review</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color={colors.gray_500} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitle}>
                        Replying to <Text style={styles.bold}>{review.customerName}</Text>'s review
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Write your response here..."
                        placeholderTextColor={colors.gray_400}
                        multiline
                        textAlignVertical="top"
                        value={text}
                        onChangeText={setText}
                        autoFocus
                    />

                    <View style={styles.footer}>
                        <Button variant="primary" size="large" onPress={handleSubmit}>
                            Post Response
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: colors.white,
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
        padding: spacing.lg,
        minHeight: 300,
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
        ...typography.body_small,
        color: colors.gray_600,
        marginBottom: spacing.md,
    },
    input: {
        backgroundColor: colors.gray_50,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        height: 120,
        color: colors.gray_900,
        fontSize: 16,
        marginBottom: spacing.lg,
    },
    footer: {
        width: '100%',
    },
    bold: {
        fontWeight: 'bold',
    }
});

export default RespondToReviewModal;

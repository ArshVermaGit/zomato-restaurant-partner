import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react-native';
import { Review } from '../../store/slices/reviewsSlice';

interface Props {
    review: Review;
    onReply: (id: string, text: string) => void;
}

const ReviewCard: React.FC<Props> = ({ review, onReply }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleSubmit = () => {
        if (replyText.trim()) {
            onReply(review.id, replyText);
            setIsReplying(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.name}>{review.customerName}</Text>
                    <Text style={styles.date}>{new Date(review.date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.rating}>
                    <Text style={styles.ratingText}>{review.rating}</Text>
                    <Star size={10} color="#FFF" fill="#FFF" />
                </View>
            </View>

            <Text style={styles.text}>{review.text}</Text>

            <View style={styles.footer}>
                <View style={styles.action}>
                    <ThumbsUp size={14} color="#666" />
                    <Text style={styles.actionText}>{review.helpfulCount} Helpful</Text>
                </View>
                {!review.response && !isReplying && (
                    <TouchableOpacity style={styles.action} onPress={() => setIsReplying(true)}>
                        <MessageCircle size={14} color="#E23744" />
                        <Text style={[styles.actionText, styles.replyText]}>Reply</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Restaurant Response */}
            {review.response && (
                <View style={styles.responseContainer}>
                    <Text style={styles.responseLabel}>Your Response:</Text>
                    <Text style={styles.responseText}>{review.response}</Text>
                </View>
            )}

            {/* Reply Input */}
            {isReplying && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write a response..."
                        value={replyText}
                        onChangeText={setReplyText}
                        multiline
                    />
                    <View style={styles.inputActions}>
                        <TouchableOpacity onPress={() => setIsReplying(false)}>
                            <Text style={styles.cancelLink}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2E7D32',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        gap: 2,
    },
    ratingText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: '#444',
        marginBottom: 12,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        gap: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionText: {
        fontSize: 12,
        color: '#666',
    },
    replyText: {
        color: '#E23744',
        fontWeight: '600',
    },
    responseContainer: {
        marginTop: 12,
        backgroundColor: '#F9F9F9',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#E23744',
    },
    responseLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    responseText: {
        fontSize: 13,
        color: '#555',
    },
    inputContainer: {
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 8,
        height: 80,
        textAlignVertical: 'top',
        fontSize: 14,
    },
    inputActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 8,
        gap: 12,
    },
    cancelLink: {
        fontSize: 14,
        color: '#666',
    },
    submitBtn: {
        backgroundColor: '#E23744',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6,
    },
    submitText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    }
});

export default ReviewCard;

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ActionButtonsProps {
    onAccept: () => void;
    onReject: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onAccept, onReject }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.rejectBtn} onPress={onReject}>
                <Text style={styles.rejectText}>Reject Order</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
                <Text style={styles.acceptText}>Accept Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    rejectBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D32F2F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rejectText: {
        color: '#D32F2F',
        fontWeight: 'bold',
        fontSize: 16,
    },
    acceptBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#E23744', // Zomato Red
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#E23744',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    acceptText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

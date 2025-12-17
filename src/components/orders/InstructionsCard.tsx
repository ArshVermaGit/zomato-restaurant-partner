import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

interface InstructionsCardProps {
    text: string;
}

export const InstructionsCard: React.FC<InstructionsCardProps> = ({ text }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <AlertCircle size={16} color="#F57C00" />
                <Text style={styles.title}>Special Instructions</Text>
            </View>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF3E0',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFE0B2',
        marginHorizontal: 16, // Added margin to make it stand out inside the scroll view if needed, or matched closely to others
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#E65100',
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 15,
        color: '#1C1C1C',
        lineHeight: 22,
    },
});

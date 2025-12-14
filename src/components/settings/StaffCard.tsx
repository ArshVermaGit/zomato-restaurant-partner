import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StaffMember } from '../../store/slices/staffSlice';
import { User, Trash2 } from 'lucide-react-native';

interface Props {
    staff: StaffMember;
    onDelete: (id: string) => void;
}

const StaffCard: React.FC<Props> = ({ staff, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <View style={styles.avatar}>
                    <User size={20} color="#666" />
                </View>
                <View>
                    <Text style={styles.name}>{staff.name}</Text>
                    <Text style={styles.role}>{staff.role}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(staff.id)}>
                <Trash2 size={18} color="#D32F2F" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    role: {
        fontSize: 12,
        color: '#666',
    },
    deleteBtn: {
        padding: 8,
    }
});

export default StaffCard;

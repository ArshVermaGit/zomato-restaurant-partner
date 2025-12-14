import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Modal, TouchableOpacity } from 'react-native';

interface Props {
    isOpen: boolean;
    onToggle: (status: boolean) => void;
}

const StatusToggle: React.FC<Props> = ({ isOpen, onToggle }) => {
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [targetStatus, setTargetStatus] = useState(false);

    const handleToggle = (value: boolean) => {
        setTargetStatus(value);
        setConfirmVisible(true);
    };

    const confirmToggle = () => {
        onToggle(targetStatus);
        setConfirmVisible(false);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Restaurant Status</Text>
                <Text style={[styles.status, isOpen ? styles.open : styles.closed]}>
                    {isOpen ? 'Open for Orders' : 'Closed'}
                </Text>
            </View>
            <Switch
                value={isOpen}
                onValueChange={handleToggle}
                trackColor={{ false: '#767577', true: '#81C784' }} // Light green track
                thumbColor={isOpen ? '#4CAF50' : '#f4f3f4'} // Green thumb
                ios_backgroundColor="#3e3e3e"
            />

            <Modal transparent visible={confirmVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {targetStatus ? 'Go Online?' : 'Go Offline?'}
                        </Text>
                        <Text style={styles.modalDesc}>
                            {targetStatus
                                ? 'You will start receiving new orders immediately.'
                                : 'You will stop receiving new orders. Ongoing orders must still be fulfilled.'}
                        </Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => setConfirmVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmBtn} onPress={confirmToggle}>
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        marginTop: 12,
        marginHorizontal: 16,
        borderRadius: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    status: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    open: {
        color: '#2E7D32',
    },
    closed: {
        color: '#D32F2F',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 24,
        borderRadius: 16,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1C1C1C',
    },
    modalDesc: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
        lineHeight: 20,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
    },
    cancelBtn: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    cancelText: {
        color: '#666',
        fontWeight: '600',
    },
    confirmBtn: {
        backgroundColor: '#E23744',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    confirmText: {
        color: '#FFF',
        fontWeight: '600',
    }
});

export default StatusToggle;

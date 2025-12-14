import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setStaff, addStaffMember, removeStaffMember, setLoading } from '../../store/slices/staffSlice';
import { RestaurantService } from '../../services/api/restaurant';
import StaffCard from '../../components/settings/StaffCard';
import { Plus, X } from 'lucide-react-native';

const StaffManagementScreen = () => {
    const dispatch = useDispatch();
    const { members, loading } = useSelector((state: RootState) => state.staff);
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newRole, setNewRole] = useState('Cashier');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        dispatch(setLoading(true));
        try {
            const data = await RestaurantService.getStaff('REST-001');
            // @ts-ignore - Mock data compatibility
            dispatch(setStaff(data));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleAdd = async () => {
        if (!newName.trim()) return;
        const newStaff = {
            name: newName,
            role: newRole,
            phone: '9999999999',
            email: 'new@staff.com'
        };
        const added = await RestaurantService.addStaff('REST-001', newStaff);
        // @ts-ignore
        dispatch(addStaffMember(added));
        setModalVisible(false);
        setNewName('');
    };

    const handleDelete = async (id: string) => {
        Alert.alert('Confirm Delete', 'Remove this staff member?', [
            { text: 'Cancel' },
            {
                text: 'Remove', style: 'destructive', onPress: async () => {
                    dispatch(removeStaffMember(id));
                    await RestaurantService.removeStaff(id);
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Staff Management</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Plus size={24} color="#E23744" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#E23744" />
            ) : (
                <FlatList
                    data={members}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <StaffCard staff={item} onDelete={handleDelete} />}
                    contentContainerStyle={styles.list}
                />
            )}

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add New Staff</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={newName}
                            onChangeText={setNewName}
                            placeholder="Full Name"
                        />

                        <Text style={styles.label}>Role</Text>
                        <View style={styles.roleRow}>
                            {['Manager', 'Chef', 'Cashier'].map(r => (
                                <TouchableOpacity
                                    key={r}
                                    style={[styles.roleChip, newRole === r && styles.roleActive]}
                                    onPress={() => setNewRole(r)}
                                >
                                    <Text style={[styles.roleText, newRole === r && styles.roleTextActive]}>{r}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                            <Text style={styles.addBtnText}>Add Staff</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    list: {
        padding: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
    roleRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    roleChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
    },
    roleActive: {
        backgroundColor: '#E23744',
    },
    roleText: {
        color: '#666',
        fontWeight: '600',
    },
    roleTextActive: {
        color: '#FFF',
    },
    addBtn: {
        backgroundColor: '#1C1C1C',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    addBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default StaffManagementScreen;

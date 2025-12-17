import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setStaff, removeStaffMember, setLoading } from '../../store/slices/staffSlice';
import { RestaurantService } from '../../services/api/restaurant';
import StaffCard from '../../components/settings/StaffCard';
import { Plus } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';

const StaffManagementScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const { members, loading } = useSelector((state: RootState) => state.staff);

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
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.zomato_red} />
                </View>
            ) : (
                <FlatList
                    data={members}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <StaffCard
                            staff={item}
                            onEdit={() => Alert.alert('Edit', 'Edit functionality not implemented yet')}
                            onDelete={handleDelete}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={styles.empty}>No staff members found.</Text>}
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddStaff')}
                activeOpacity={0.8}
            >
                <Plus size={24} color={colors.white} />
                <Text style={styles.fabText}>Add Staff</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray_50,
    },
    header: {
        padding: spacing.md,
        paddingTop: 50,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.gray_900,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: spacing.md,
        paddingBottom: 100,
    },
    empty: {
        textAlign: 'center',
        color: colors.gray_500,
        marginTop: spacing.xl,
    },
    fab: {
        position: 'absolute',
        bottom: spacing.xl,
        right: spacing.md,
        backgroundColor: colors.zomato_red,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: 25,
        elevation: 5,
        shadowColor: colors.zomato_red,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        gap: 8,
    },
    fabText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default StaffManagementScreen;

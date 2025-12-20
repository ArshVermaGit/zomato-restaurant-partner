import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { bulkUpdateAvailability, bulkDeleteItems } from '../../store/slices/menuSlice';
import SelectableMenuItem from '../../components/menu/SelectableMenuItem';
import BulkActionsBar from '../../components/menu/BulkActionsBar';
import { colors, spacing } from '../../theme';
import { CheckSquare, Square } from 'lucide-react-native';

const BulkMenuOperationsScreen = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.menu);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // Flatten items for list
    const allItems = Object.values(items);

    const toggleSelection = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === allItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(allItems.map(i => i.id));
        }
    };

    const bulkMarkAvailable = () => {
        dispatch(bulkUpdateAvailability({ ids: selectedItems, isAvailable: true }));
        setSelectedItems([]);
        Alert.alert('Success', 'Items marked as available');
    };

    const bulkMarkUnavailable = () => {
        dispatch(bulkUpdateAvailability({ ids: selectedItems, isAvailable: false }));
        setSelectedItems([]);
        Alert.alert('Success', 'Items marked as unavailable');
    };

    const bulkDelete = () => {
        Alert.alert('Confirm Delete', `Delete ${selectedItems.length} items?`, [
            { text: 'Cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    dispatch(bulkDeleteItems(selectedItems));
                    setSelectedItems([]);
                }
            }
        ]);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleSelectAll} style={styles.selectAllContainer}>
                    {selectedItems.length === allItems.length && allItems.length > 0 ? (
                        <CheckSquare size={20} color={colors.zomato_red} />
                    ) : (
                        <Square size={20} color={colors.gray_500} />
                    )}
                    <Text style={styles.selectAllText}>Select All ({allItems.length})</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Bulk Operations</Text>
            </View>

            <FlatList
                data={allItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SelectableMenuItem
                        item={item}
                        selected={selectedItems.includes(item.id)}
                        onToggle={() => toggleSelection(item.id)}
                    />
                )}
                contentContainerStyle={styles.list}
            />

            {selectedItems.length > 0 && (
                <BulkActionsBar
                    selectedCount={selectedItems.length}
                    onMarkAvailable={bulkMarkAvailable}
                    onMarkUnavailable={bulkMarkUnavailable}
                    onDelete={bulkDelete}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_200,
    },
    selectAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    selectAllText: {
        fontWeight: '500',
        color: colors.gray_700,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.gray_900,
    },
    list: {
        paddingBottom: 100, // Space for action bar
    },
});

export default BulkMenuOperationsScreen;

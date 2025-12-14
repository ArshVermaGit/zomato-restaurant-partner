import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setMenuData, toggleItemAvailability, deleteItem } from '../../store/slices/menuSlice';
import { RestaurantService } from '../../services/api/restaurant';
import MenuCategory from '../../components/menu/MenuCategory';
import MenuItemCard from '../../components/menu/MenuItemCard';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const { categories, items, loading } = useSelector((state: RootState) => state.menu);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    useEffect(() => {
        loadMenu();
    }, []);

    const loadMenu = async () => {
        try {
            const data = await RestaurantService.getMenu('REST-001');
            dispatch(setMenuData(data));
            // Expand all by default
            const initialExpanded = data.categories.reduce((acc: any, cat: any) => {
                acc[cat.id] = true;
                return acc;
            }, {});
            setExpandedCategories(initialExpanded);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleExpand = (catId: string) => {
        setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
    };

    const handleToggleItem = async (itemId: string, isAvailable: boolean) => {
        dispatch(toggleItemAvailability({ id: itemId, isAvailable }));
        await RestaurantService.upsertItem({ id: itemId, isAvailable });
    };

    const handleDeleteItem = async (itemId: string) => {
        // Confirm logic here
        dispatch(deleteItem(itemId));
        await RestaurantService.deleteItem(itemId);
    };

    const getItemsByCategory = (catId: string) => {
        return Object.values(items).filter(item => item.categoryId === catId);
    };

    return (
        <View style={styles.container}>
            <View style={styles.screenHeader}>
                <Text style={styles.title}>Menu Management</Text>
                <TouchableOpacity
                    style={styles.addCatBtn}
                    onPress={() => navigation.navigate('AddEditCategory', { mode: 'add' })}
                >
                    <Plus size={16} color="#FFF" />
                    <Text style={styles.addCatText}>Add Category</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#E23744" />
                </View>
            ) : (
                <FlatList
                    data={categories}
                    keyExtractor={item => item.id}
                    renderItem={({ item: category }) => {
                        const catItems = getItemsByCategory(category.id);
                        const isExpanded = expandedCategories[category.id];

                        return (
                            <View>
                                <MenuCategory
                                    category={category}
                                    expanded={isExpanded}
                                    itemCount={catItems.length}
                                    onToggleExpand={() => toggleExpand(category.id)}
                                    onAddItem={() => navigation.navigate('AddEditItem', { mode: 'add', categoryId: category.id })}
                                />
                                {isExpanded && catItems.map(menuItem => (
                                    <MenuItemCard
                                        key={menuItem.id}
                                        item={menuItem}
                                        onToggle={(val) => handleToggleItem(menuItem.id, val)}
                                        onEdit={() => navigation.navigate('AddEditItem', { mode: 'edit', itemId: menuItem.id })}
                                        onDelete={() => handleDeleteItem(menuItem.id)}
                                    />
                                ))}
                            </View>
                        );
                    }}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    screenHeader: {
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    addCatBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addCatText: {
        color: '#FFF',
        fontWeight: '600',
        marginLeft: 4,
        fontSize: 12,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingBottom: 40,
    }
});

export default MenuScreen;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { RestaurantService } from '../../services/api/restaurant';
import { selectRestaurant } from '../../store/slices/restaurantSlice';

const RestaurantSelectionScreen = () => {
    const dispatch = useDispatch();
    const { restaurants, loading } = useSelector((state: RootState) => state.restaurant);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        loadRestaurants();
    }, []);

    const loadRestaurants = async () => {
        try {
            await RestaurantService.getMyRestaurants();
        } catch (error) {
            Alert.alert('Error', 'Failed to load restaurants');
        }
    };

    const handleSelect = (restaurant: any) => {
        dispatch(selectRestaurant(restaurant));
        // Navigation to Dashboard will happen automatically in RootNavigator
    };

    const handleAddRestaurant = () => {
        Alert.alert('Info', 'Feature coming soon: Add a new restaurant listing.');
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
            <View style={styles.cardContent}>
                <View style={styles.imagePlaceholder} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                    <View style={[styles.badge, item.status === 'ACTIVE' ? styles.activeBadge : styles.inactiveBadge]}>
                        <Text style={styles.badgeText}>{item.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcome}>Welcome, {user?.name || 'Partner'}</Text>
                <Text style={styles.subtext}>Select a restaurant to manage</Text>
            </View>

            <FlatList
                data={restaurants}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListFooterComponent={
                    <TouchableOpacity style={styles.addButton} onPress={handleAddRestaurant}>
                        <Text style={styles.addButtonText}>+ Add New Restaurant</Text>
                    </TouchableOpacity>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        padding: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    welcome: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    subtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: '#EEE',
        borderRadius: 8,
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    activeBadge: {
        backgroundColor: '#E8F5E9',
    },
    inactiveBadge: {
        backgroundColor: '#FFEBEE',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#236161',
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        borderStyle: 'dashed',
    },
    addButtonText: {
        color: '#236161',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default RestaurantSelectionScreen;

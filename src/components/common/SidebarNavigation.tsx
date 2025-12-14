import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {
    onClose: () => void;
}

const SidebarNavigation: React.FC<Props> = ({ onClose }) => {
    const navigation = useNavigation<any>();

    const navigateTo = (screen: string) => {
        navigation.navigate(screen);
        onClose();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Menu</Text>
            </View>
            <TouchableOpacity style={styles.item} onPress={() => navigateTo('Settings')}>
                <Text style={styles.itemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigateTo('Financials')}>
                <Text style={styles.itemText}>Financials</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigateTo('Reviews')}>
                <Text style={styles.itemText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigateTo('KDS')}>
                <Text style={styles.itemText}>Kitchen Display</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 50,
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E23744',
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    }
});

export default SidebarNavigation;

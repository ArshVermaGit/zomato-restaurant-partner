import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setTransactions, setLoading } from '../../store/slices/financialsSlice';
import { RestaurantService } from '../../services/api/restaurant';
import TransactionCard from '../../components/financials/TransactionCard';

const TransactionsScreen = () => {
    const dispatch = useDispatch();
    const { transactions, loading } = useSelector((state: RootState) => state.financials);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        dispatch(setLoading(true));
        try {
            const data = await RestaurantService.getTransactions('REST-001');
            dispatch(setTransactions(data));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>All Transactions</Text>
            </View>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#E23744" />
                </View>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard transaction={item} />}
                    contentContainerStyle={styles.list}
                />
            )}
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
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    }
});

export default TransactionsScreen;

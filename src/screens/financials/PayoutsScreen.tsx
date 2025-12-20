import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setPayouts, setLoading } from '../../store/slices/financialsSlice';
import { RestaurantService } from '../../services/api/restaurant';
import PayoutCard from '../../components/financials/PayoutCard';
import { CreditCard } from 'lucide-react-native';

const PayoutsScreen = () => {
    const dispatch = useDispatch();
    const { payouts, loading } = useSelector((state: RootState) => state.financials);

    const loadData = React.useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const data = await RestaurantService.getPayouts('REST-001');
            dispatch(setPayouts(data));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Payouts & Settlements</Text>
            </View>

            <View style={styles.bankSection}>
                <View style={styles.bankCard}>
                    <View style={styles.bankHeader}>
                        <CreditCard size={20} color="#FFF" />
                        <Text style={styles.bankTitle}>Registered Bank Account</Text>
                    </View>
                    <Text style={styles.accountName}>HDFC Bank</Text>
                    <Text style={styles.accountNumber}>•••• •••• •••• 1234</Text>
                    <Text style={styles.ifsc}>HDFC0000123</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Settlement History</Text>

            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#E23744" />
                </View>
            ) : (
                <FlatList
                    data={payouts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <PayoutCard payout={item} />}
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
    bankSection: {
        padding: 16,
    },
    bankCard: {
        backgroundColor: '#1C1C1C',
        borderRadius: 12,
        padding: 20,
        elevation: 4,
    },
    bankHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    bankTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontWeight: '600',
    },
    accountName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    accountNumber: {
        color: '#FFF',
        fontSize: 16,
        letterSpacing: 2,
        marginBottom: 4,
    },
    ifsc: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16,
        marginBottom: 8,
        color: '#333',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    }
});

export default PayoutsScreen;

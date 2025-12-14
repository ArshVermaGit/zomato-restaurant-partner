import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setFinancialsOverview, setLoading, setTransactions } from '../../store/slices/financialsSlice';
import { RestaurantService } from '../../services/api/restaurant';
import { ArrowRight, DollarSign, Calendar } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import TransactionCard from '../../components/financials/TransactionCard';

const FinancialsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const { overview, transactions, loading } = useSelector((state: RootState) => state.financials);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        dispatch(setLoading(true));
        try {
            const data = await RestaurantService.getFinancialsOverview('REST-001');
            dispatch(setFinancialsOverview(data));

            // Allow previewing last 3 transactions
            const txns = await RestaurantService.getTransactions('REST-001');
            dispatch(setTransactions(txns.slice(0, 3)));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (loading || !overview) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#E23744" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Financial Overview</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Payouts')}>
                    <Text style={styles.link}>Payouts Details</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.mainCard}>
                    <Text style={styles.cardLabel}>Pending Settlement</Text>
                    <Text style={styles.totalAmount}>₹{overview.pendingSettlement.toLocaleString()}</Text>
                    <View style={styles.payoutRow}>
                        <Calendar size={14} color="#FFF" />
                        <Text style={styles.payoutText}>Next Payout: {new Date(overview.nextPayoutDate).toDateString()}</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Today's Revenue</Text>
                        <Text style={styles.statValue}>₹{overview.todayRevenue.toLocaleString()}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Week's Revenue</Text>
                        <Text style={styles.statValue}>₹{overview.weekRevenue.toLocaleString()}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Transactions</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
                    <View style={styles.viewAll}>
                        <Text style={styles.viewAllText}>View All</Text>
                        <ArrowRight size={16} color="#E23744" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.list}>
                {transactions.map(item => (
                    <TransactionCard key={item.id} transaction={item} />
                ))}
            </View>

        </ScrollView>
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
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    link: {
        color: '#E23744',
        fontWeight: '600',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        padding: 16,
        gap: 12,
    },
    mainCard: {
        backgroundColor: '#E23744',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#E23744',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    cardLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginBottom: 8,
    },
    totalAmount: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    payoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    payoutText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    statLabel: {
        color: '#666',
        fontSize: 12,
        marginBottom: 4,
    },
    statValue: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 12,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    viewAll: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewAllText: {
        color: '#E23744',
        fontWeight: '600',
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    }
});

export default FinancialsScreen;

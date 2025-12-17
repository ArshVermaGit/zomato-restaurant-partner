import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setFinancialsOverview, setLoading, setTransactions, setBankAccount } from '../../store/slices/financialsSlice';
import { RestaurantService } from '../../services/api/restaurant';
import { colors, spacing } from '../../theme';

import RevenueCard from '../../components/financials/RevenueCard';
import SettlementCard from '../../components/financials/SettlementCard';
import TransactionsList from '../../components/financials/TransactionsList';
import BankAccountCard from '../../components/financials/BankAccountCard';
import RevenueBreakdownChart from '../../components/financials/RevenueBreakdownChart';

const FinancialsScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const { overview, transactions, bankAccount, loading } = useSelector((state: RootState) => state.financials);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        dispatch(setLoading(true));
        try {
            const overviewData = await RestaurantService.getFinancialsOverview('REST-001');
            dispatch(setFinancialsOverview(overviewData));

            // @ts-ignore - Mock data has extra fields compatible with prop types
            const txns = await RestaurantService.getTransactions('REST-001');
            // @ts-ignore
            dispatch(setTransactions(txns));

            const bank = await RestaurantService.getBankAccount('REST-001');
            dispatch(setBankAccount(bank));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (loading || !overview) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.zomato_red} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Financials</Text>
            </View>

            <View style={styles.content}>
                <RevenueCard
                    today={overview.todayRevenue}
                    week={overview.weekRevenue}
                    month={overview.monthRevenue}
                />

                <SettlementCard
                    amount={overview.pendingSettlement}
                    nextPayoutDate={overview.nextPayoutDate}
                />

                <TransactionsList
                    // @ts-ignore - mock compatibility
                    transactions={transactions}
                    onFilter={() => navigation.navigate('Transactions')} // Or a modal
                />

                <RevenueBreakdownChart />

                <BankAccountCard account={bankAccount} />
            </View>
        </ScrollView>
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
    content: {
        padding: spacing.md,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FinancialsScreen;

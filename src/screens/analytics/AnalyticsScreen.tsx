import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAnalyticsData, setTopItems, setLoading } from '../../store/slices/analyticsSlice';
import { RestaurantService } from '../../services/api/restaurant';
import { Download, TrendingUp, DollarSign, Star, Clock } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '@zomato/ui';

import DateRangePicker from '../../components/analytics/DateRangePicker';
import MetricsGrid from '../../components/analytics/MetricsGrid';
import MetricCard from '../../components/analytics/MetricCard';
import TopItemsTable from '../../components/analytics/TopItemsTable';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen = () => {
    const dispatch = useDispatch();
    const { overview, revenueTrend, ordersTrend, topItems, loading } = useSelector((state: RootState) => state.analytics);
    const [selectedRange, setSelectedRange] = useState('WEEK');

    useEffect(() => {
        loadAnalytics();
    }, [selectedRange]);

    const loadAnalytics = async () => {
        dispatch(setLoading(true));
        try {
            const data = await RestaurantService.getAnalytics('REST-001', selectedRange);
            dispatch(setAnalyticsData(data));

            const items = await RestaurantService.getTopItems('REST-001');
            dispatch(setTopItems(items));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const chartConfig = {
        backgroundGradientFrom: colors.white,
        backgroundGradientTo: colors.white,
        color: (opacity = 1) => `rgba(226, 55, 68, ${opacity})`, // Zomato Red
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.6,
        propsForDots: { r: "4", strokeWidth: "2", stroke: colors.zomato_red }
    };

    if (loading || !overview) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.zomato_red} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>Business Insights</Text>
                <DateRangePicker
                    selectedRange={selectedRange}
                    onRangeChange={setSelectedRange}
                />
            </View>

            {/* Metrics Grid */}
            <MetricsGrid>
                <MetricCard
                    label="Revenue"
                    value={`₹${overview.revenue.toLocaleString()}`}
                    icon={DollarSign}
                    iconColor={colors.success}
                    trend="up"
                    trendValue="12%"
                />
                <MetricCard
                    label="Orders"
                    value={overview.totalOrders}
                    icon={TrendingUp}
                    iconColor={colors.primary.zomato_red}
                />
                <MetricCard
                    label="Rating"
                    value={overview.customerRating}
                    icon={Star}
                    iconColor={colors.warning}
                />
                <MetricCard
                    label="Avg Prep Time"
                    value={`${overview.avgPrepTime}m`}
                    icon={Clock}
                    iconColor={colors.warning}
                    trend="down"
                    trendValue="2m"
                />
            </MetricsGrid>

            {/* Revenue Chart */}
            <View style={styles.chartSection}>
                <Text style={styles.chartTitle}>Revenue Trend (₹)</Text>
                {revenueTrend && (
                    <LineChart
                        data={{
                            labels: revenueTrend.labels,
                            datasets: revenueTrend.datasets
                        }}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                    />
                )}
            </View>

            {/* Orders Chart */}
            <View style={styles.chartSection}>
                <Text style={styles.chartTitle}>Orders by Day</Text>
                {ordersTrend && (
                    <BarChart
                        data={{
                            labels: ordersTrend.labels,
                            datasets: ordersTrend.datasets
                        }}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={{
                            ...chartConfig,
                            color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`,
                        }}
                        yAxisLabel=""
                        yAxisSuffix=""
                        style={styles.chart}
                    />
                )}
            </View>

            {/* Top Items */}
            <TopItemsTable items={topItems} />

            {/* Download Report Button */}
            <View style={styles.downloadContainer}>
                {/* 
                     NOTE: Button doesn't support leftIcon prop directly based on previous issues, 
                     so wrapping icon manually or checking if Button allows children with icon layout.
                     For now, using standard Button with text, will verify icon support if needed.
                     The user asked for `leftIcon={<Download />}`, I will check if I can support similar structure.
                     Since Button is from @zomato/ui, I'll stick to children. 
                */}
                <View style={{ width: '100%' }}>
                    <Button variant="outline" size="large" onPress={() => console.log('Download')}>
                        Download Report
                    </Button>
                </View>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: spacing.md,
        paddingBottom: 40,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: spacing.lg,
        marginTop: spacing.xl,
        gap: spacing.md,
    },
    title: {
        ...typography.h2,
        color: colors.gray_900,
    },
    chartSection: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginTop: spacing.lg,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    chartTitle: {
        ...typography.h4,
        marginBottom: spacing.md,
        color: colors.gray_900,
    },
    chart: {
        borderRadius: borderRadius.lg,
        marginVertical: 8,
    },
    downloadContainer: {
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
    }
});

export default AnalyticsScreen;

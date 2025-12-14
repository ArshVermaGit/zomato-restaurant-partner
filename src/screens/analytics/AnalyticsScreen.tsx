import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAnalyticsData, setTopItems, setLoading } from '../../store/slices/analyticsSlice';
import { RestaurantService } from '../../services/api/restaurant';
import { Calendar, Download, TrendingUp, DollarSign, Star, Clock } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

const RANGES = ['TODAY', 'WEEK', 'MONTH'];

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
        backgroundGradientFrom: "#FFF",
        backgroundGradientTo: "#FFF",
        color: (opacity = 1) => `rgba(226, 55, 68, ${opacity})`, // Zomato Red
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.6,
        propsForDots: { r: "4", strokeWidth: "2", stroke: "#E23744" }
    };

    if (loading || !overview) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#E23744" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>Business Insights</Text>

                <View style={styles.rangeContainer}>
                    {RANGES.map(range => (
                        <TouchableOpacity
                            key={range}
                            style={[styles.rangeBtn, selectedRange === range && styles.activeRange]}
                            onPress={() => setSelectedRange(range)}
                        >
                            <Text style={[styles.rangeText, selectedRange === range && styles.activeRangeText]}>
                                {range}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Overview Cards */}
            <View style={styles.cardsRow}>
                <View style={[styles.card, styles.highlightCard]}>
                    <View style={styles.cardHeader}>
                        <DollarSign size={16} color="#2E7D32" />
                        <Text style={styles.cardLabel}>Revenue</Text>
                    </View>
                    <Text style={styles.cardValue}>₹{overview.revenue.toLocaleString()}</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <TrendingUp size={16} color="#1976D2" />
                        <Text style={styles.cardLabel}>Orders</Text>
                    </View>
                    <Text style={styles.cardValue}>{overview.totalOrders}</Text>
                </View>
            </View>

            <View style={styles.cardsRow}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Star size={16} color="#FBC02D" />
                        <Text style={styles.cardLabel}>Rating</Text>
                    </View>
                    <Text style={styles.cardValue}>{overview.customerRating}</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Clock size={16} color="#F57C00" />
                        <Text style={styles.cardLabel}>Prep Time</Text>
                    </View>
                    <Text style={styles.cardValue}>{overview.avgPrepTime}m</Text>
                </View>
            </View>

            {/* Charts */}
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

            <View style={styles.chartSection}>
                <Text style={styles.chartTitle}>Peak Hours (Orders)</Text>
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
                            // Override color for bar chart if needed
                            color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`,
                        }}
                        yAxisLabel=""
                        yAxisSuffix=""
                        style={styles.chart}
                    />
                )}
            </View>

            {/* Top Items */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Performing Items</Text>
                <TouchableOpacity style={styles.downloadBtn}>
                    <Download size={16} color="#666" />
                    <Text style={styles.downloadText}>Export</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemsList}>
                {topItems.map((item, index) => (
                    <View key={item.id} style={styles.itemRow}>
                        <View style={styles.rank}>
                            <Text style={styles.rankText}>#{index + 1}</Text>
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDetail}>{item.orders} orders • ₹{item.revenue.toLocaleString()}</Text>
                        </View>
                        <View style={styles.ratingBadge}>
                            <Star size={12} color="#FFF" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
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
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    rangeContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 4,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    rangeBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    activeRange: {
        backgroundColor: '#E23744',
    },
    rangeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    activeRangeText: {
        color: '#FFF',
    },
    cardsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    highlightCard: {
        backgroundColor: '#E8F5E9',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    cardLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },
    cardValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    chartSection: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        elevation: 2,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    chart: {
        borderRadius: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    downloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        padding: 8,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    downloadText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    itemsList: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 8,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    rank: {
        width: 24,
        height: 24,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rankText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#666',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    itemDetail: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2E7D32',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        gap: 2,
    },
    ratingText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    }
});

export default AnalyticsScreen;

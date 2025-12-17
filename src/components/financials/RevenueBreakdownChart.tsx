import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { BarChart } from 'react-native-chart-kit';

const RevenueBreakdownChart = () => {
    // Mock data for breakdown
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [12000, 14500, 11000, 18000, 22000, 28000, 25000]
            }
        ]
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Revenue Trend</Text>
            <BarChart
                data={data}
                width={Dimensions.get('window').width - 64} // padding adjustment
                height={220}
                yAxisLabel="₹"
                yAxisSuffix=""
                chartConfig={{
                    backgroundColor: colors.white,
                    backgroundGradientFrom: colors.white,
                    backgroundGradientTo: colors.white,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(226, 55, 68, ${opacity})`, // Zomato Red
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    barPercentage: 0.6,
                }}
                style={styles.chart}
                showValuesOnTopOfBars={false} // Clean look
                fromZero
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        overflow: 'hidden',
    },
    title: {
        ...typography.h4,
        color: colors.gray_900,
        marginBottom: spacing.md,
    },
    chart: {
        borderRadius: borderRadius.md,
        marginRight: -16, // Hack to fix chart padding
    }
});

export default RevenueBreakdownChart;

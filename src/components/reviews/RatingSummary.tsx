import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

interface Props {
    average: number;
    totalCount: number;
    distribution: { [key: number]: number };
}

const RatingSummary: React.FC<Props> = ({ average, totalCount, distribution }) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.average}>{average.toFixed(1)}</Text>
                <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={16} color={i <= Math.round(average) ? "#FBC02D" : "#DDD"} fill={i <= Math.round(average) ? "#FBC02D" : "none"} />
                    ))}
                </View>
                <Text style={styles.total}>{totalCount} Reviews</Text>
            </View>

            <View style={styles.right}>
                {[5, 4, 3, 2, 1].map(rating => {
                    const count = distribution[rating] || 0;
                    const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;

                    return (
                        <View key={rating} style={styles.barRow}>
                            <Text style={styles.starLabel}>{rating} ★</Text>
                            <View style={styles.barBg}>
                                <View style={[styles.barFill, { width: `${percentage}%` }]} />
                            </View>
                            <Text style={styles.countLabel}>{count}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
    },
    left: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16,
        borderRightWidth: 1,
        borderRightColor: '#EEE',
    },
    average: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1C1C1C',
    },
    stars: {
        flexDirection: 'row',
        marginVertical: 4,
        gap: 2,
    },
    total: {
        fontSize: 12,
        color: '#666',
    },
    right: {
        flex: 1,
        paddingLeft: 16,
        justifyContent: 'center',
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    starLabel: {
        fontSize: 12,
        color: '#666',
        width: 25,
    },
    barBg: {
        flex: 1,
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        marginHorizontal: 8,
    },
    barFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 3,
    },
    countLabel: {
        fontSize: 12,
        color: '#999',
        width: 30,
        textAlign: 'right',
    }
});

export default RatingSummary;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

interface Props {
    selectedRange: string;
    onRangeChange: (range: string) => void;
    ranges?: string[];
}

const DateRangePicker: React.FC<Props> = ({
    selectedRange,
    onRangeChange,
    ranges = ['TODAY', 'WEEK', 'MONTH']
}) => {
    return (
        <View style={styles.container}>
            {ranges.map(range => (
                <TouchableOpacity
                    key={range}
                    style={[
                        styles.rangeBtn,
                        selectedRange === range && styles.activeRange
                    ]}
                    onPress={() => onRangeChange(range)}
                >
                    <Text style={[
                        styles.rangeText,
                        selectedRange === range && styles.activeRangeText
                    ]}>
                        {range}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: 4,
        borderWidth: 1,
        borderColor: colors.gray_200,
        alignSelf: 'flex-start',
    },
    rangeBtn: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    activeRange: {
        backgroundColor: colors.zomato_red,
    },
    rangeText: {
        ...typography.caption,
        fontWeight: '600',
        color: colors.gray_600,
    },
    activeRangeText: {
        color: colors.white,
    }
});

export default DateRangePicker;

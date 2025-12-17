import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface Props {
    day: string;
    isOpen: boolean;
    time: string;
    onToggle: () => void;
    onTimePress: () => void;
}

const DayScheduleRow: React.FC<Props> = ({ day, isOpen, time, onToggle, onTimePress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.day}>{day}</Text>
                <TouchableOpacity onPress={onTimePress} disabled={!isOpen}>
                    <Text style={[styles.time, !isOpen && styles.closedText]}>
                        {isOpen ? time : 'Closed'}
                    </Text>
                </TouchableOpacity>
            </View>
            <Switch
                value={isOpen}
                onValueChange={onToggle}
                trackColor={{ false: colors.gray_200, true: colors.zomato_red }}
                thumbColor={colors.white}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    left: {
        gap: 4,
    },
    day: {
        ...typography.body_medium,
        fontWeight: '600',
        color: colors.gray_900,
    },
    time: {
        ...typography.caption,
        color: colors.gray_600,
    },
    closedText: {
        color: colors.gray_400,
        fontStyle: 'italic',
    }
});

export default DayScheduleRow;

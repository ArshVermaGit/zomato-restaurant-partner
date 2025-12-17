import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { ChevronRight } from 'lucide-react-native';

interface Props {
    label: string;
    badge?: string;
    onPress: () => void;
    isLast?: boolean;
}

const MenuItem: React.FC<Props> = ({ label, badge, onPress, isLast }) => {
    return (
        <TouchableOpacity
            style={[styles.container, isLast && styles.lastItem]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.label}>{label}</Text>
            <View style={styles.right}>
                {badge && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                )}
                <ChevronRight size={20} color={colors.gray_400} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_100,
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    label: {
        ...typography.body_medium,
        color: colors.gray_900,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    badge: {
        backgroundColor: colors.primary.zomato_red_tint,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeText: {
        ...typography.caption,
        color: colors.zomato_red,
        fontWeight: '600',
    }
});

export default MenuItem;

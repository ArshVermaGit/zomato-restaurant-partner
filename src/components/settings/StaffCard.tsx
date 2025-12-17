import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Edit2, Trash2 } from 'lucide-react-native';
import { StaffMember } from '../../store/slices/staffSlice';

interface Props {
    staff: StaffMember;
    onEdit?: () => void;
    onDelete?: (id: string) => void;
}

const StaffCard: React.FC<Props> = ({ staff, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <View style={styles.header}>
                    <Text style={styles.name}>{staff.name}</Text>
                    <View style={[styles.badge, staff.active ? styles.activeBadge : styles.inactiveBadge]}>
                        <Text style={[styles.badgeText, staff.active ? styles.activeText : styles.inactiveText]}>
                            {staff.active ? 'ACTIVE' : 'INACTIVE'}
                        </Text>
                    </View>
                </View>
                <Text style={styles.role}>{staff.role}</Text>
            </View>

            <View style={styles.actions}>
                {onEdit && (
                    <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
                        <Edit2 size={18} color={colors.gray_600} />
                    </TouchableOpacity>
                )}
                {onDelete && (
                    <TouchableOpacity onPress={() => onDelete(staff.id)} style={styles.actionBtn}>
                        <Trash2 size={18} color={colors.zomato_red} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.gray_100,
    },
    info: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: 4,
    },
    name: {
        ...typography.body_large,
        fontWeight: '600',
        color: colors.gray_900,
    },
    role: {
        ...typography.caption,
        color: colors.gray_500,
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    activeBadge: {
        backgroundColor: colors.semantic.success_light,
    },
    inactiveBadge: {
        backgroundColor: colors.gray_200,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    activeText: {
        color: colors.success,
    },
    inactiveText: {
        color: colors.gray_600,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    actionBtn: {
        padding: 4,
    }
});

export default StaffCard;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Plus, Trash2, Edit2, X } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '@zomato/ui';

export interface ModifierOption {
    id: string;
    name: string;
    price: number;
}

export interface ModifierGroup {
    id: string;
    title: string; // e.g., "Choose Toppings"
    minSelection: number; // 0 for optional, 1 for required
    maxSelection: number;
    options: ModifierOption[];
}

interface Props {
    groups: ModifierGroup[];
    onChange: (groups: ModifierGroup[]) => void;
}

const ModifierGroupBuilder: React.FC<Props> = ({ groups, onChange }) => {
    const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
    const [tempGroup, setTempGroup] = useState<ModifierGroup | null>(null);
    const [newOption, setNewOption] = useState<{ name: string, price: string }>({ name: '', price: '' });

    const createNewGroup = () => {
        const newGroup: ModifierGroup = {
            id: Date.now().toString(),
            title: '',
            minSelection: 0,
            maxSelection: 1,
            options: []
        };
        setTempGroup(newGroup);
        setEditingGroupId(newGroup.id);
    };

    const saveGroup = () => {
        if (!tempGroup || !tempGroup.title) return;

        let newGroups = [...groups];
        const existingIndex = newGroups.findIndex(g => g.id === tempGroup.id);

        if (existingIndex >= 0) {
            newGroups[existingIndex] = tempGroup;
        } else {
            newGroups.push(tempGroup);
        }

        onChange(newGroups);
        setEditingGroupId(null);
        setTempGroup(null);
    };

    const addOptionToTemp = () => {
        if (!newOption.name || !newOption.price || !tempGroup) return;

        const option: ModifierOption = {
            id: Date.now().toString(),
            name: newOption.name,
            price: parseFloat(newOption.price)
        };

        setTempGroup({
            ...tempGroup,
            options: [...tempGroup.options, option]
        });
        setNewOption({ name: '', price: '' });
    };

    const removeOptionFromTemp = (optId: string) => {
        if (!tempGroup) return;
        setTempGroup({
            ...tempGroup,
            options: tempGroup.options.filter(o => o.id !== optId)
        });
    };

    const removeGroup = (groupId: string) => {
        onChange(groups.filter(g => g.id !== groupId));
    };

    if (editingGroupId && tempGroup) {
        return (
            <View style={styles.editorContainer}>
                <View style={styles.header}>
                    <Text style={styles.sectionTitle}>Modifier Group</Text>
                    <TouchableOpacity onPress={() => setEditingGroupId(null)}>
                        <X size={20} color={colors.gray_600} />
                    </TouchableOpacity>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Group Title (e.g. "Toppings")</Text>
                    <TextInput
                        style={styles.input}
                        value={tempGroup.title}
                        onChangeText={t => setTempGroup({ ...tempGroup, title: t })}
                        placeholder="Group Title"
                        autoFocus
                    />
                </View>

                <View style={styles.row}>
                    <View style={styles.flexFieldRight}>
                        <Text style={styles.label}>Min Selection</Text>
                        <TextInput
                            style={styles.input}
                            value={tempGroup.minSelection.toString()}
                            onChangeText={t => setTempGroup({ ...tempGroup, minSelection: parseInt(t, 10) || 0 })}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.flexFieldLeft}>
                        <Text style={styles.label}>Max Selection</Text>
                        <TextInput
                            style={styles.input}
                            value={tempGroup.maxSelection.toString()}
                            onChangeText={t => setTempGroup({ ...tempGroup, maxSelection: parseInt(t, 10) || 1 })}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.optionsSection}>
                    <Text style={styles.optionsLabel}>Options</Text>
                    {tempGroup.options.map(opt => (
                        <View key={opt.id} style={styles.optionRow}>
                            <Text style={styles.optionName}>{opt.name}</Text>
                            <Text style={styles.optionPrice}>+₹{opt.price}</Text>
                            <TouchableOpacity onPress={() => removeOptionFromTemp(opt.id)}>
                                <X size={16} color={colors.error} />
                            </TouchableOpacity>
                        </View>
                    ))}

                    <View style={styles.addOptionRow}>
                        <TextInput
                            style={styles.optionNameInput}
                            placeholder="Option Name"
                            value={newOption.name}
                            onChangeText={t => setNewOption({ ...newOption, name: t })}
                        />
                        <TextInput
                            style={styles.optionPriceInput}
                            placeholder="Price"
                            keyboardType="numeric"
                            value={newOption.price}
                            onChangeText={t => setNewOption({ ...newOption, price: t })}
                        />
                        <TouchableOpacity style={styles.addBtnSmall} onPress={addOptionToTemp}>
                            <Plus size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.saveBtnContainer}>
                    <Button variant="primary" size="medium" onPress={saveGroup}>
                        Save Group
                    </Button>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Add-ons & Modifiers</Text>
                <TouchableOpacity onPress={createNewGroup}>
                    <Text style={styles.addText}>+ Add Group</Text>
                </TouchableOpacity>
            </View>

            {groups.length === 0 ? (
                <Text style={styles.emptyText}>No modifier groups added.</Text>
            ) : (
                groups.map(group => (
                    <View key={group.id} style={styles.groupCard}>
                        <View>
                            <Text style={styles.groupTitle}>{group.title}</Text>
                            <Text style={styles.groupSubtitle}>
                                {group.options.length} options • Select {group.minSelection}-{group.maxSelection}
                            </Text>
                        </View>
                        <View style={styles.groupActions}>
                            <TouchableOpacity onPress={() => { setTempGroup(group); setEditingGroupId(group.id); }}>
                                <Edit2 size={18} color={colors.gray_600} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removeGroup(group.id)}>
                                <Trash2 size={18} color={colors.error} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.lg,
    },
    editorContainer: {
        backgroundColor: colors.gray_50,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        marginTop: spacing.lg,
        borderWidth: 1,
        borderColor: colors.gray_200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.gray_900,
    },
    addText: {
        color: colors.zomato_red,
        fontWeight: '600',
    },
    field: {
        marginBottom: spacing.md,
    },
    label: {
        ...typography.label_small,
        color: colors.gray_600,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray_300,
        borderRadius: borderRadius.md,
        padding: spacing.sm,
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
    },
    optionsSection: {
        marginTop: spacing.sm,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.sm,
        marginBottom: spacing.xs,
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        borderColor: colors.gray_200,
    },
    optionName: {
        flex: 1,
        ...typography.body_small,
        color: colors.gray_800,
    },
    optionPrice: {
        ...typography.label_small,
        color: colors.gray_600,
        marginRight: spacing.md,
    },
    addOptionRow: {
        flexDirection: 'row',
        marginTop: spacing.sm,
    },
    addBtnSmall: {
        backgroundColor: colors.zomato_red,
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontStyle: 'italic',
        color: colors.gray_500,
        marginTop: spacing.sm,
    },
    groupCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.gray_200,
        marginTop: spacing.sm,
    },
    groupTitle: {
        ...typography.body_medium,
        fontWeight: '600',
        color: colors.gray_900,
    },
    groupSubtitle: {
        ...typography.caption,
        color: colors.gray_500,
    },
    groupActions: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    flexFieldRight: {
        marginBottom: spacing.md,
        flex: 1,
        marginRight: 8,
    },
    flexFieldLeft: {
        marginBottom: spacing.md,
        flex: 1,
        marginLeft: 8,
    },
    optionsLabel: {
        ...typography.label_small,
        color: colors.gray_600,
        marginBottom: 8,
    },
    optionNameInput: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray_300,
        borderRadius: borderRadius.md,
        padding: spacing.sm,
        fontSize: 14,
        flex: 2,
        marginRight: 8,
    },
    optionPriceInput: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray_300,
        borderRadius: borderRadius.md,
        padding: spacing.sm,
        fontSize: 14,
        flex: 1,
        marginRight: 8,
    },
    saveBtnContainer: {
        marginTop: 16,
    }
});

export default ModifierGroupBuilder;

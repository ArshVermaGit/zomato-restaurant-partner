import { colors as rawColors, typography, spacing, shadows, borderRadius } from '@zomato/design-tokens';

// Flatten colors for easier access as per user snippet
const colors = {
    ...rawColors.primary,
    ...rawColors.secondary,
    ...rawColors.semantic,
    ...rawColors.food,
    ...rawColors // Keep original nested structure available too if needed
};

export { colors, typography, spacing, shadows, borderRadius };

import { useNavigation } from '@react-navigation/native';
import { EmptyState } from '@zomato/ui';
import { Package, FileText, MessageSquare } from 'lucide-react-native';

interface Props {
    onRefresh?: () => void;
}

export const RestaurantEmptyStates = {
    NoOrders: ({ onRefresh }: Props) => (
        <EmptyState
            variant="orders"
            icon={Package}
            title="No Orders Yet"
            description="Orders will appear here when customers place them"
            ctaText="Refresh"
            onPressCta={onRefresh}
        />
    ),

    NoMenuItems: () => {
        const navigation = useNavigation<any>();
        return (
            <EmptyState
                icon={FileText}
                title="No Menu Items"
                description="Add items to your menu to start receiving orders"
                ctaText="Add First Item"
                onPressCta={() => navigation.navigate('AddEditItem', { mode: 'add' })}
            />
        );
    },

    NoReviews: () => (
        <EmptyState
            icon={MessageSquare}
            title="No Reviews Yet"
            description="Reviews from customers will appear here"
        />
    ),
};

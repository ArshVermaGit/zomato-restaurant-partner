import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/menu/MenuScreen';
import AddEditItemScreen from '../screens/menu/AddEditItemScreen';
import AddEditCategoryScreen from '../screens/menu/AddEditCategoryScreen';

const Stack = createStackNavigator();

export const MenuStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MenuList" component={MenuScreen} />
            <Stack.Screen
                name="AddEditItem"
                component={AddEditItemScreen}
                options={{ presentation: 'modal' }} // Open as modal
            />
            <Stack.Screen
                name="AddEditCategory"
                component={AddEditCategoryScreen}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    );
};

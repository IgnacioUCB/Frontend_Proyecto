import { createStackNavigator } from '@react-navigation/stack';

import { AntDesign } from '@expo/vector-icons';

interface ContextStateProps {
    children: ReactElement | ReactElement[] | null;
}

export type ClientShoppingCartNavigatorParamsList = {
    CategoryListScreen: undefined;
    ProductListScreen: { categoryId: number };
    ShoppingCartScreen: undefined;
    PayScreen: undefined;
}

const Stack = createStackNavigator<ClientShoppingCartNavigatorParamsList>();

import ShowProductScreen from '../../../screens/product/client/showProduct/ShowProductScreen';
import ShowCategoryScreen from '../../../screens/category/client/showCategory/ShowCategoryScreen';
import { ShoppingCartScreen } from '../../../screens/shoppingCart/ShoppingCartScreen';
import { PayScreen } from '../../../screens/Payment/PayScreen';
import { Text, TouchableOpacity } from 'react-native';
import React, { ReactElement } from 'react';
import { ShoppingCartProvider } from '../../../context/shoppingCart/ShoppingCartContext';
import { Category } from '../../../../Domain/entities/Category';

export const ClientShoppingCartNavigator = () => {
    return (
        <ShoppingCartState>
            <Stack.Navigator
                initialRouteName="CategoryListScreen"
            >
                <Stack.Screen
                    name="CategoryListScreen"
                    component={ShowCategoryScreen}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="ProductListScreen"
                    component={ShowProductScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ShoppingCartScreen"
                    component={ShoppingCartScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="PayScreen"
                    component={PayScreen}
                    options={{
                        headerShown: true,
                        headerTitle: 'Pago Pedido'
                    }}
                />
            </Stack.Navigator>
        </ShoppingCartState>
    );
}

const ShoppingCartState: React.FC<ContextStateProps> = ({ children }) => {
    return (
        <ShoppingCartProvider>
            {children}
        </ShoppingCartProvider>
    )
}
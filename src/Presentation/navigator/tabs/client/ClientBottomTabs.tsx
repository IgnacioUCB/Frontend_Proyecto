import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ClientShoppingCartNavigator } from './ClientShoppingCartNavigator';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import ProfileUpdateScreen from '../../../screens/profile/update/ProfileUpdateScreen';

import React from 'react';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';


export type ClientBottomTabParamsList = {
    ProfileInfoScreen: undefined;
    ClientShoppingCartNavigator: undefined;
}


const Tab = createBottomTabNavigator<ClientBottomTabParamsList>();

export const ClientBottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='ClientShoppingCartNavigator'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="ClientShoppingCartNavigator"
                component={ClientShoppingCartNavigator}
                options={{
                    title: 'Tienda',
                    tabBarIcon: ({ size, color }) => <MaterialIcons name="shopping-basket" size={size} color={color} />
                }}
            />

            <Tab.Screen

                name="ProfileInfoScreen"
                component={ProfileInfoScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color={color} />
                }}
            />
            
        </Tab.Navigator>
    );
}
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native'; // Import the Text component from react-native

import { FontAwesome } from '@expo/vector-icons';

import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import  CategoryScreen  from '../../../screens/category/admin/getAllCategory/CategoryScreen';

export type RootAdminButonParamsList = {
    ProfileInfoScreen : undefined
    ProfileScreen: undefined
    Category: undefined
}


const Tab = createBottomTabNavigator<RootAdminButonParamsList>();

export const AdminBottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='ProfileInfoScreen'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="ProfileInfoScreen"
                component={ProfileInfoScreen}
                options={{
                    title: 'Perfil',
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color: focused ? 'red' : 'black' , fontSize:12}}>Perfil</Text> // Use the Text component correctly
                    ),
                    tabBarIcon: ({ size, color }) => <FontAwesome name ="user" size={20} color={'black'} />
                }}
            />
            <Tab.Screen
                name = "Category"
                component = {CategoryScreen}
                options = {{
                    title: 'Categorias',
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color: focused ? 'red' : 'black', fontSize:12}}>Categorias</Text> // Use the Text component correctly
                    ),
                    tabBarIcon: ({ size}) => <FontAwesome name ="list" size={20} color={'black'} />
                }}
            />
            
        </Tab.Navigator>
    );
}
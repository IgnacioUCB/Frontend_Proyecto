import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import LoginScreen from "../screens/login/LoginScreen";
import { RegisterScreen } from "../screens/register/RegisterScreen";
import { CreateProductScreen } from "../screens/product/admin/createProduct/CreateProductScreen";
import { GetAllProductScreen } from "../screens/product/admin/getAllProduct/GetAllProductScreen";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import CategoryScreen from '../screens/category/admin/getAllCategory/CategoryScreen';
import CreateCategoryScreen from '../screens/category/admin/createCategory/CreateCategoryScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import { AdminBottomTabs } from './tabs/admin/AdminBottonTabs';
import ProfileUpdateScreen from "../screens/profile/update/ProfileUpdateScreen";
import { ClientBottomTabs } from './tabs/client/ClientBottomTabs';
import ChangePasswordScreen from "../screens/changePassword/ChangePasswordScreen";

export type RootStackParamsList = {
    Login: undefined,
    Register: undefined,
    AdminBottomTabs: undefined,
    ClientBottomTabs: undefined 
    CreateProduct: { categoryId: number };
    ChangePassword: undefined,
    GetAllProduct: { categoryId: number };
    Category: undefined
    CreateCategory: undefined
    ProfileUpdateScreen : undefined
}


const Stack = createStackNavigator<RootStackParamsList>();

export const MainAppStack = () => {

    const {user, status } = useContext(AuthContext);

    if (status == 'checking') return <LoadingScreen/>

    const renderRoleScreen = () => {
        if(user.role_id === 2 ){
            //client
            return <>
                <Stack.Screen name = "ClientBottomTabs" component = {ClientBottomTabs} />
                <Stack.Screen name = "ProfileUpdateScreen" component = {ProfileUpdateScreen} />
            </>
                
        }else if(user.role_id === 3 ){
            return(
            <Stack.Screen name="ClientBottomTabs" component={ClientBottomTabs} />
            )
        }else{
            //Admin
            return <>
                <Stack.Screen name="AdminBottomTabs" component={AdminBottomTabs} />
                <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
                <Stack.Screen name="Category" component={CategoryScreen} /> 
                <Stack.Screen name="CreateCategory" component={CreateCategoryScreen} />
                <Stack.Screen name="GetAllProduct" component={GetAllProductScreen} />
                <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
            </>
        }
    }
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{ 
                headerShown: false
             }}
        >

            {
                (status !== 'authenticated')
                    ?(
                        <>
                            <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen name="Register" component={RegisterScreen} />                        
                            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                        </>
                    )
                    :
                    renderRoleScreen()
            }
            
        </Stack.Navigator>
    );
}
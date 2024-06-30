import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from 'react';


interface ContextStateProps{
    children: ReactElement | ReactElement[] | null;
}

export type ClientAddressNavigatorParamList = {
    AddressListScreen: undefined;
    AddressCreateScreen: undefined;
}
const Stack = createStackNavigator<ClientAddressNavigatorParamList>();

import AddressListScreen from "../../../screens/Address/List/AddressListScreen";
import AddressCreateScreen from "../../../screens/Address/create/AddressCreateScreen";
import { AddressProvider } from "../../../context/address/AddressContext";

export const ClientAddressNavigator = () => {
    return (
        <AddressState>
            <Stack.Navigator>
                <Stack.Screen name = "AddressListScreen" component = {AddressListScreen} 
                options={{
                    headerTitle: 'Mis Direcciones'
                }}/>
                <Stack.Screen name = "AddressCreateScreen" component = {AddressCreateScreen} options={{
                    headerTitle: 'Añadir Direccion'
                }}/>
            </Stack.Navigator>

        </AddressState>

    )

} 

const AddressState : React.FC<ContextStateProps> = ({children}) => {
    return(
        <AddressProvider>
            {children}
        </AddressProvider>
    )
}
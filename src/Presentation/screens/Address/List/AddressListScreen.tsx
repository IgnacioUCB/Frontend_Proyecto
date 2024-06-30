import { ListHeader } from '../../../components/ListHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { RootStackParamsList } from '../../../navigator/MainAppStack'
import { StackScreenProps } from '@react-navigation/stack'
import { RoundedButton } from '../../../components/RoundedButton';


import AddressStyle from './addressStyle';
import showAddressViewModel from './ViewModel';
import LoadingScreen from "../../LoadingScreen";
import AddressItem from './AddressItem';


const AddressListScreen = ({navigation},route) => {

    const {address } = showAddressViewModel();
    
    
    return(

        <View style={AddressStyle.container}>
        <View>
            <View>
                {/* <Text>{JSON.stringify(address)}</Text> */}
                <FlatList
                    data ={address}
                    renderItem={({item}) => (
                    <AddressItem address={item}/>
                    )}
                    keyExtractor={(item) => item.id}
                    
                />                    
            </View>
        </View>

        <View style ={AddressStyle.AddButtom} >
            <RoundedButton 
                text = 'Agregar Direccion'
                onPress = {() => navigation.navigate('AddressCreateScreen')}

            />
        </View>            
    </View>

        

    )
    

}
  
export default AddressListScreen;
import { View,Text, TouchableOpacity } from "react-native";
import React from "react";
import { Address } from "../../../../Domain/entities/Address";
import {Feather}  from '@expo/vector-icons';

import AddressStyle from "./addressStyle";

interface Props {
    address: Address ;
}

export const AddressItem = ({address} : Props) =>{
    return(
        <View style = {AddressStyle.container}>
            <View style = {AddressStyle.AddressList}>

                <View style = {AddressStyle.itemButtonContainer}>
                    <TouchableOpacity  style = {AddressStyle.itemActionButton}
                        onPress={() => console.log('Direccion Elegida: ' , address.address)}
                    
                    >
                    <Feather name= "check-circle" style ={AddressStyle.itemActions} size={25}/>
                    </TouchableOpacity>
                </View>
                <Text style = {AddressStyle.formText}>{address.nickname}</Text>
                <Text style = {AddressStyle.addressText}>{address.address}</Text>
            </View>
            
            <View style ={AddressStyle.divisor}></View>
        </View>
    )
}
export default AddressItem
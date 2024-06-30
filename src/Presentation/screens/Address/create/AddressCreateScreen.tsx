import React, { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'


import CreateStyles from './Styles'

import useViewModel from './ViewModel'
import LoadingScreen from '../../LoadingScreen'
import { Directions, ScrollView, TextInput } from 'react-native-gesture-handler'
import { Header, StackScreenProps } from '@react-navigation/stack'
import { RoundedButton } from '../../../components/RoundedButton'
import { ClientAddressNavigatorParamList } from '../../../navigator/tabs/client/ClientAddressNavigator'
import MapView, { MapMarker, Marker } from 'react-native-maps'

interface Props
  extends StackScreenProps<ClientAddressNavigatorParamList, "AddressCreateScreen"> {}


const  AddressCreateScreen  = ({ navigation, route }: Props) => {

    const {
        nickname,
        address,
        lat,
        long,
        user_id,
        onChange,
        errorMessages,
        loading,
        origin,
        setOrigin,
        destination,
        setDestination,
        errorsResponse,
        setErrorMessages,
        create
    } = useViewModel(); 

    if(loading){
      return <LoadingScreen />
    } else if(errorsResponse !== undefined && errorsResponse.length > 0){
      return (
        <View>
          <Text style={{marginTop: 50}}> Error </Text>
        </View>
      )
    } else{

  return (
    <View style={CreateStyles.container}>
        <View style={{ ...CreateStyles.form, height: "75%" }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Text style={CreateStyles.formText}>
                Ingrese todos los datos solicitados
                </Text>

                {/* Nickname */}
                <View style={CreateStyles.formInput}>
                    <Text style ={CreateStyles.formText}>Alias</Text>
                </View>
                <View style={CreateStyles.formInput}>
                    <TextInput
                        style={CreateStyles.formTextInput}
                        placeholder={"Ingrese un alias para la direccion"} //funciona
                        keyboardType="default"
                        value={nickname}
                        secureTextEntry={false}
                        onChangeText={(text) => onChange("nickname", text)}
                        editable= {!loading}
                    />
                </View>

                {errorMessages.nickname && <Text style={CreateStyles.formError}>{errorMessages.nickname}</Text>}
                
                
                {/* Address  */}
                <View style={CreateStyles.formInput}>
                    <Text style ={CreateStyles.formText}>Direccion</Text>
                </View>
                <View style={CreateStyles.formInput}>
                    <TextInput
                        style={CreateStyles.formTextInput} //funciona
                        placeholder={
                        "Ingrese la direccion"
                        }
                        keyboardType="default"
                        value={address}
                        secureTextEntry={false}
                        onChangeText={(text) => onChange("address", text)}
                        editable= {!loading}
                    />
                </View>

                {errorMessages.address && <Text style={CreateStyles.formError}>{errorMessages.address}</Text>}
                    
                {/* Map (Lat y long) */}

                <View style={CreateStyles.formInput}>
                    <Text style ={CreateStyles.formText}>Indique la posicion en el mapa </Text>
                </View>

                <View>
                    <MapView 
                    style = {CreateStyles.map}
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01, 
                    }}
                    >
                        <Marker 
                            draggable
                            coordinate = {origin}
                            onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                        />
                    </MapView>
                </View>

                {errorMessages.long && <Text style={CreateStyles.formError}>{errorMessages.long}</Text>}

                {/* Create Button */}
                <View style={{ marginTop: 35 }}>
                    {
                    (!loading) && (
                        <RoundedButton
                        text="Añadir Direccion"
                        onPress={create}
                        />
                    )
                    }
                </View>
            </ScrollView>
        </View>

        {
            loading && (
                <ActivityIndicator style = {CreateStyles.loading} size={"large"} color={"red"}/>
            )
        }
    </View>
  );
}
};

export default AddressCreateScreen

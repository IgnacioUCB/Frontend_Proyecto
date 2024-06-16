import { View, Text, Image } from 'react-native'
import React from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { RootClientButonParamsList } from '../../../navigator/tabs/client/ClientBottonTabs'


import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import styles from './Styles';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../components/RoundedButton';
import { RootStackParamsList } from '../../../navigator/MainAppStack';


interface Props extends StackScreenProps<RootStackParamsList,'AdminBottomTabs'> {};


export const ProfileInfoScreen = ({navigation}, Props) => {

    const {user, logoutUser} = useViewModel();
    return (
        <View style={styles.container}>
               

            <View style = {styles.form}>
                <Text style = {styles.formText}>Información perfil</Text>
                <View style ={{ backgroundColor: '#fff', borderRadius: 100, top: '3%', right: '6%', position: 'absolute', marginTop: 35}}>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={logoutUser}
                    >
                        <MaterialCommunityIcons style ={{padding: 6}} name="logout" size={35} color="#000" />
                    </TouchableOpacity>
                </View>
                <View style = {styles.logoContainer}>
                    <Image
                        source = {{uri: user?.image_url}}
                        style= {styles.logoImage}
                    />
                    <Text style = {{marginTop: 10,fontWeight: 'bold',fontSize:16}}>Imagen</Text>
                </View>
                <View style= {{...styles.formInfo, marginTop: 340}}>
                    <Image
                        source={require('../../../../../assets/profile_apifood.png')}
                        style={styles.formIcon}
                    />
                    <View style = {styles.formContent}>
                        <Text style = {{fontWeight: 'bold'}}>Nombre y Apellido</Text>
                        <Text>{user?.name} {user?.last_name}</Text>
                    </View>
                </View >
                <View style= {{...styles.formInfo, marginTop: 30}}>
                    <Image
                        source={require('../../../../../assets/email.png')}
                        style={styles.formIcon}
                    />
                    <View style = {styles.formContent}>
                        <Text style = {{fontWeight: 'bold'}}>Email</Text>
                        <Text>{user?.email}</Text>
                    </View>
                </View>
                <View style= {{...styles.formInfo, marginTop: 30, marginBottom: 100}}>
                    <Image
                        source={require('../../../../../assets/phone_apifood.png')}
                        style={styles.formIcon}
                    />
                    <View style = {styles.formContent}>
                        <Text style = {{fontWeight: 'bold'}}>Teléfono</Text>
                        <Text>{user?.phone}</Text>
                    </View>
                </View>

                <RoundedButton
                    text = 'Actualizar información'
                    onPress = {() => navigation.navigate('ProfileUpdateScreen')}
                    
                />
            
            </View>
        </View>

    )
}



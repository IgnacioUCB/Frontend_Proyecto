import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'


import styles from './Styles'
import {MaterialCommunityIcons} from '@expo/vector-icons';

import userViewModel from './ViewModel'
import { ImageButton } from '../../../components/ImageButton'
import { RootStackParamsList } from '../../../navigator/MainAppStack'
import { StackScreenProps } from '@react-navigation/stack'
import { ScrollView } from 'react-native-gesture-handler'
import { ModalPickImage } from '../../../components/ModalPickImage'
import { RoundedButton } from '../../../components/RoundedButton'
import { showMessage } from 'react-native-flash-message'

interface Props extends StackScreenProps<RootStackParamsList,'ProfileUpdateScreen'> {};

const ProfileUpdateScreen = ({navigation}: Props) => {

  const {
    name,
    last_name,
    image,
    phone,
    errorMessages,
    successMessage,
    loading,
    file,
    onChange,
    onChangeInfoUpdate,
    updateUserInfo,
    pickImage,
    takePhoto,
    user
  } = userViewModel()

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    onChangeInfoUpdate(user.name, user.last_name, user.phone)
  }, [user])

  const handleUpdateUser = async () => {
    const response = await updateUserInfo()
    if(response){
      showMessage({
        message: 'Perfil actualizado correctamente',
        type: 'success',
        icon: 'success',
        
      })
    }
    
    
  }

  return (
    <View style = {styles.container}>
  
      

      <View style = {styles.form}>
        <View style = {{top: '4%', left: '3%', position: 'absolute', marginTop: 50}}>
          <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => navigation.goBack()}
          >
              <MaterialCommunityIcons style ={{padding: 6}} name="arrow-left" size={35} color="#000" />
          </TouchableOpacity>
        </View>
          
        <View style = {styles.logoContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
          >
            {
              image == ''
              ?
              <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style = {styles.logo}
                  source = {{uri: user?.image_url}}
                />
                <Text style = {styles.logoText}>Seleccione una imagen</Text>
                {
                  errorMessages.image && <Text style = {styles.errorText}>{errorMessages.image}</Text>
                }
                </View>
                :
                <Image
                  style = {styles.logo}
                  source = {{uri: image}}
                />
            }
          </TouchableOpacity>
        </View>
        <View>
          <Text style = {styles.formText}>Actualizar Perfil</Text>
          {/* Name Input */}
          <View style={{...styles.formInput, marginTop: 290}}>
            <Image
              style={styles.formIcon}
              source={require('../../../../../assets/profile_apifood.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'Ingresa tu nombre'}
              keyboardType='default'
              value={name}
              onChangeText={text => onChange('name', text)}
              secureTextEntry={false}
            />

          </View>
          {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}


          <View style={{...styles.formInput, marginTop: 20}}>
            <Image
              style={styles.formIcon}
              source={require('../../../../../assets/profile_apifood.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'Ingresa tu apellido'}
              keyboardType='default'
              value={last_name}
              onChangeText={text => onChange('last_name', text)}
              secureTextEntry={false}
            />

          </View>
          {errorMessages.last_name && <Text style={styles.errorText}>{errorMessages.last_name}</Text>}

          <View style={{...styles.formInput, marginTop: 20, marginBottom: 30}}>
            <Image
              style={styles.formIcon}
              source={require('../../../../../assets/phone_apifood.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'Ingresa tu teléfono'}
              keyboardType='default'
              value={phone}
              onChangeText={text => onChange('phone', text)}
              secureTextEntry={false}
            />

          </View>
          {errorMessages.phone && <Text style={styles.errorText}>{errorMessages.phone}</Text>}

          <View style = {{marginTop: 15}}>
            {
              loading === false && (
                <RoundedButton 
                  text = 'Confirmar'
                  onPress={() => handleUpdateUser()}
                  color = {'#EE3D2F'}
                />
              )
            }
          </View>
          {/*
          <View style = {{marginTop: 30}}>
            <RoundedButton
              text = 'Cambiar contraseña'
              onPress={() => navigation.nvigate('nombre de la pantalla de cambio de contraseña')}
              color = {'#EE3D2F'}
              
            />
          </View>
          */
          }
          

          
          <View style = {{marginTop: 30}}>
            <RoundedButton
              text = 'Cancelar'
              onPress={() => navigation.goBack()}
              color = {'#EE3D2F'}
              
            />
          </View>

        </View>

      </View>
      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />
      {
        loading && (
        <ActivityIndicator style = {styles.loading} size = {"large"} color= {"red"}/>)
      }
    </View>
  )
}

export default ProfileUpdateScreen

import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';

import { RoundedButton } from '../../components/RoundedButton'
import { ImageButton } from '../../components/ImageButton';
import { ModalPickImage } from '../../components/ModalPickImage';

import styles from './Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigator/MainAppStack';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<RootStackParamsList, 'Register'> {


}

export const RegisterScreen = ({navigation, route}:Props) => {

    const { 
      name,
      last_name, 
      email,
      phone,
      password,
      confirmPassword,
      image,
      onChange,
      pickImage,
      takePhoto,
      register,
      errorMessages,
      errorsResponse,
      loading } = useViewModel();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageBackground}
                source={require('../../../../assets/background_apifood.jpg')}
            />


           <View style={styles.logoContainer}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >
                    {
                        (image == '')
                            ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../../../assets/camera.png')}
                                />
                                <Text style={styles.logoText}>Seleccione una imagen</Text>
                                {
                                    errorMessages.image && (
                                        <Text
                                            style={{
                                                ...styles.errorText,
                                                marginTop: 10, backgroundColor: '#ff7f7f', borderLeftWidth: 3,
                                                borderColor: '#993235',
                                                color: 'white',
                                                fontSize: 14,
                                                fontWeight: '600',
                                                marginVertical: 12,
                                                paddingVertical: 8,
                                                paddingHorizontal: 12,
                                            }}
                                        >
                                            {errorMessages.image}
                                        </Text>
                                    )
                                }
                            </View>
                            :
                            <Image
                                style={styles.logo}
                                source={{ uri: image }}
                            />
                    }
                </TouchableOpacity>
            </View>
            
            <View style={{ ...styles.form, height: '75%' }}>
                <Text style={styles.formText}>Registrarse</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                <View style={styles.formInput}>
                <Image
                style={styles.formIcon}
                source={require('../../../../assets/profile_apifood.png')}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={'Ingrese su nombre'}
                keyboardType='default'
                value={name}
                onChangeText={text => onChange('name', text)}
                secureTextEntry={false}
                />

                </View>
                {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}

                <View style={styles.formInput}>
                <Image
                style={styles.formIcon}
                source={require('../../../../assets/profile_apifood.png')}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={'Ingrese su apellido'}
                keyboardType='default'
                value={last_name}
                onChangeText={text => onChange('last_name', text)}
                secureTextEntry={false}
                />

                </View>
                {errorMessages.last_name && <Text style={styles.errorText}>{errorMessages.last_name}</Text>}

                <View style={styles.formInput}>
            <Image
              style={styles.formIcon}
              source={require('../../../../assets/email.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'Ingrese su email'}
              keyboardType='default'
              value={email}
              onChangeText={text => onChange('email', text)}
              secureTextEntry={false}
            />

          </View>
          {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}

          <View style={styles.formInput}>
            <Image
              style={styles.formIcon}
              source={require('../../../../assets/password_apifood.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'Ingrese su contraseña'}
              keyboardType='default'
              value={password}
              onChangeText={text => onChange('password', text)}
              secureTextEntry={true}
            />
        
          </View>
          {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}

          <View style = {styles.formInput}>
            <Image
              style={styles.formIcon}
              source={require('../../../../assets/password_apifood.png')}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder={'Confirmar contraseña'}
              keyboardType='default'
              value={confirmPassword}
              onChangeText={text => onChange('confirmPassword', text)}
              secureTextEntry={true}
            />


          </View>
          {errorMessages.confirmPassword && <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>}

          <View style={styles.formInput}>
              <Image
                  style={styles.formIcon}
                  source={require('../../../../assets/phone_apifood.png')}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={'Ingrese su telefono'}
                keyboardType='default'
                value={phone}
                onChangeText={text => onChange('phone', text)}
                secureTextEntry={false}
                />

          </View>
          {errorMessages.phone && <Text style={styles.errorText}>{errorMessages.phone}</Text>}


          <View style={{ marginTop: 35 }}>
            <RoundedButton
              text='Registrarse'
              onPress={register}
            />
            <View style={styles.formRegister}>
              <Text style={{ fontWeight: '500' }}>¿Ya tienes cuenta?</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Login')}
              >
              <Text style={styles.formRegisterText}>Inicia Sesion</Text>
              </TouchableOpacity>
            </View>
       
          </View>
                </ScrollView>
            
        </View>
        <ModalPickImage
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                openGallery={pickImage}
                openCamera={takePhoto}
            />
        {loading && (
                <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
          )
        }   
        </View>
    )
}
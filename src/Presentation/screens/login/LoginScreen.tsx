import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'

import styles from './Styles';
import { RoundedButton } from '../../components/RoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigator/MainAppStack';
import useViewModel from './ViewModel';
import { AuthContext } from '../../context/auth/AuthContext';
interface Props extends StackScreenProps<RootStackParamsList, 'Login'> { }

const LoginScreen = ({ navigation, route }: Props) => {

  const { email, password, onChange, login, errorMessages, errorsResponse } = useViewModel();

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require('../../../../assets/background_apifood.jpg')}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/apifood_logo.png')}
        />

      </View>

      <View style={{ ...styles.form, height: '55%' }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

          <Text style={styles.formText}>Inicio de Sesión</Text>

          {
            errorsResponse.length > 0 && (
              <View style={styles.errorsContainer}>
                <Text style={{ ...styles.formText, color: '#FFF', marginLeft: 10 }}>
                  Por favor revise de nuevo
                </Text>
                <FlatList
                  scrollEnabled={false}
                  data={errorsResponse}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={`${index}-${item.path}`} style={{ marginBottom: 10 }}>
                        <Text style={{
                          ...styles.errorText,
                          fontSize: 14,
                          paddingVertical: 0,
                          marginVertical: 2,
                          borderLeftWidth: 0
                        }}>{`\u2022  ${item.value}`}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            )
          }

          <View style={styles.formInput}>
            <Image
              style={styles.formIcon}
              source={require('../../../../assets/profile_apifood.png')}
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
              placeholder={'******'}
              keyboardType='default'
              value={password}
              onChangeText={text => onChange('password', text)}
              secureTextEntry={true}
            />

          </View>
          {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}


          <View style={{ marginTop: 30 }}>
            <RoundedButton
              text='Ingresar'
              onPress={login}
            />

            <View style={styles.container2}>
              <Text style={styles.text}>
                ¿Olvidaste tu contraseña?
              </Text>
              <RoundedButton
                text='Cambiar contraseña'
                onPress={() => navigation.navigate('ChangePassword')}
              />
            </View>

            <View style={styles.formLogin}>
              <Text style={{ fontWeight: '500' }}>¿No tienes cuenta?</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.formRegisterText}>Regístrate</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default LoginScreen;

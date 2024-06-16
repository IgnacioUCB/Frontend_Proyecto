import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useChangePasswordViewModel } from './ViewModel';
import { useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const {
        email,
        newPassword,
        confirmPassword,
        onChange,
        errorMessages,
        changePassword
    } = useChangePasswordViewModel();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cambiar contraseña</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => onChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChangeText={(text) => onChange('newPassword', text)}
                    secureTextEntry
                />
                {errorMessages.newPassword && <Text style={styles.errorText}>{errorMessages.newPassword}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar nueva contraseña"
                    value={confirmPassword}
                    onChangeText={(text) => onChange('confirmPassword', text)}
                    secureTextEntry
                />
                {errorMessages.confirmPassword && <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={changePassword}>
                    <Text style={styles.submitButtonText}>CONFIRMAR CAMBIAR CONTRASEÑA</Text>
                </TouchableOpacity>

                <View style={styles.spacer} />

                <TouchableOpacity style={styles.submitButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.submitButtonText}>VOLVER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 4,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    buttonContainer: {
        marginTop: 20, // Ajusta el espacio entre los botones y el resto del formulario
    },
    submitButton: {
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    spacer: {
        height: 20, // Espacio entre los botones
    },
});

export default ChangePasswordScreen;

import { StyleSheet } from "react-native";

const Loginstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    imageBackground: {
        bottom: 30,
        width: '100%',
        height: '70%',
        opacity: 0.4,
    },
    form: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
        marginLeft: 15
    },
    formLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    formRegisterText: {
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
        color: 'orange',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginLeft: 10
    },
    formIcon: {
        width: 30,
        height: 30,
        marginTop: 10
    },
    logoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '15%'
    },
    logo: {
        width: 200,
        height: 200
    },
    logoText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    submitButton: {
        backgroundColor: 'orange',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Loginstyles;

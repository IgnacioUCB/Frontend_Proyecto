import { ImageBackground, StyleSheet } from "react-native";

const ProfileUpdateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    form: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },

    formText : {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    formInput: {
        flexDirection: 'row',
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEB',
        marginLeft: 10,
    },
    formIcon:{
        width: 30,
        height: 30,
        marginTop: 10,
    },
    logoContainer:{
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top : '14%'
    },
    logo:{
        borderColor: '#000',
        borderRadius: 100,
        borderWidth: 2,
        width: 130,
        height: 130,
        marginTop: 50
    },
    logoText:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 10
    },
    loading:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    errorText:{
        backgroundColor: '#ff7f7f',
        borderLeftWidth: 2,
        borderColor: '993235',
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    errorContainer:{
        backgroundColor: 'red',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
    }
    
});

export default ProfileUpdateStyles;
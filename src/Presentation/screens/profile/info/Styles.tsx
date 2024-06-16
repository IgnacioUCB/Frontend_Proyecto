import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    
    form: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    formContent:{
        marginLeft: 15
    },
    formInfo: {
        flexDirection: 'row',
        marginTop: 5
    },
    formIcon: {
        width: 30,
        height: 30,
        marginTop: 10
    },
    formText : {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    logoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '18%'
    },

    logoImage: {
        borderColor: '#000',
        borderRadius: 100,
        borderWidth: 2,
        width: 200,
        height: 200
    }

});

export default ProfileInfoStyles;
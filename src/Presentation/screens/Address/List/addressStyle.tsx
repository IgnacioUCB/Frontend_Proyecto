import { StyleSheet, Dimensions } from "react-native";
const {height, width} = Dimensions.get('screen');

const AddressStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    AddButtom:{
        flex: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
        
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
        textAlign: 'left',
    },
    addressText : {
        marginTop: 20,
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'justify',
    },
    title:{
        marginTop: 50,
         marginBottom: 50,
         marginLeft:10,
        fontSize: 28,
        textAlign: 'left',
        fontWeight: '400' 
    },
    AddressList: {
        padding: width*0.02,
    },
    itemActions: {
        flex: 1,
        flexGrow: 1,
        width: width*0.07,
        flexDirection: 'row-reverse',
        height: width*0.2, 
        alignItems: 'center',
        justifyContent:'center'
      },
    itemActionButton: {
        backgroundColor: '#F06775',
        width: width*0.07,
        height: width*0.07,
        borderRadius: width*0.12/2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    itemButtonContainer: {
        width: width*0.1,
        height: width*0.05, 
        alignItems: 'center'
        
    },
    divisor:{
        marginTop: 10,
        marginBottom: 10,
        marginLeft:10,
        backgroundColor: '#000000',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 1,
        position: 'relative',
        bottom: 0,
        width: '100%',
    },

});

export default AddressStyle;
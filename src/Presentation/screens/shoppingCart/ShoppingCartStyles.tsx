import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "../../../Presentation/theme/AppTheme";
const { height, width } = Dimensions.get("screen");

const shoppingCartStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 70,
        paddingTop: 12,
        paddingHorizontal: 20,
        marginBottom: 6,
    },
    image: {
        borderRadius: 10,
        height: 60,
        width: 60
    },
    productInfo: {
        flex: 1
    },
    title: {
        color: 'black',
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 20
    },
    titleText: {
        color: 'black',
        marginTop: 50,
        marginBottom: 50,
        marginLeft:10,
        fontSize: 28,
        flex: 1,
        textAlign: 'center',
        fontWeight: '400'
    },
    price: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
        marginRight: 45
    },
    productActions: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 2,
        marginRight: 50
    },
    actions: {
        flexDirection: 'row',
        flex: 1
    },
    actionLess: {
        backgroundColor: '#e4e4e4',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,

    },
    actionAdd: {
        backgroundColor: '#e4e4e4',
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    actionText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500'
    },
    quantity: {
        backgroundColor: '#e4e4e4',
        paddingHorizontal: 10,
        alignSelf: 'center',
        textAlign: 'center',
    },
    deleteItem: {
        width: 25,
        height: 25,
    },
    containerList: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    imageBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.1,
    },
    totalToPay: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    totalInfo: {
        alignItems: 'center'
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    totalText2: {
        fontWeight: 'bold',
        fontSize: 36,
    },
    containerPay: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
});
export default shoppingCartStyles;
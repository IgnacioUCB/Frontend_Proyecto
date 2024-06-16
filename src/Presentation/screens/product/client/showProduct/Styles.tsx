import { StyleSheet, Dimensions } from "react-native";
const {height, width} = Dimensions.get('screen');

const ShowProductStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: width*0.04,
        marginTop: height*0.05,
      },
      productHeaderText: {
        fontSize: width*0.08,
        fontWeight: '400',
      },
      productAddButton: {
        width: width*0.12,
        height: width*0.12,
        borderRadius: width*0.12/2,
      },
      productAddButtonImage: {
        width: width*0.12,
        height: width*0.12, 
      },
      productList: {
        padding: width*0.02,
      },
      listItem: {
        flexDirection: 'row',
        padding: width*0.01,
        margin: width*0.01,
        backgroundColor: 'red',
        //round borders and shadow
        borderRadius: width*0.02,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center'

      },
      imageContainer: {
        margin: width*0.01,
      },
      image: {
        width: width*0.3,
        height: width*0.3,
      },
      title:{
        marginTop: 50,
         marginBottom: 50,
         marginLeft:10,
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '400' 
      },
      textContainer: {
        flex: 1,
        flexGrow: 0.9,
        width: width,
        height: width*0.25,
      },
      contentContainer: {
        flex: 1,
        flexGrow: 0.8,
        flexDirection: 'row',
        height: width*0.25,
        backgroundColor: 'white',
        borderRadius: width*0.02,
        padding: width*0.01,
        margin: width*0.01,
      },
      itemActions: {
        flex: 1,
        flexGrow: 0.2,
        width: width*0.1,
        flexDirection: 'column',
      },
      itemActionButton: {
        backgroundColor: '#dddddd',
        borderRadius: 5,
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
      },
      addItemButtonContainer: {
        flex: 1,
        flexGrow: 0.1
      },
      itemQuantity: {
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      listItemText: {
        fontSize: width*0.04,
        fontWeight: 'bold',
        color: 'black',
        margin: width*0.01,
      },
      description: {
        fontSize: width*0.03,
        color: 'black',
        margin: width*0.01,
      },
      buttonContainer: {
        flexDirection: 'column',
        //backgroundColor: 'white',
        //borderRadius: width*0.02,
      },
      productItemButton: {
        padding: width*0.02,
      },
      productItemButtonImage: {
        width: width*0.08,
        height: width*0.08,
      },
      shoppingCartLogo: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        backgroundColor: 'red', 
        color: 'white', 
        borderRadius: 10, 
        paddingHorizontal: 5, 
        fontSize: 12 
      }
});

export default ShowProductStyles;
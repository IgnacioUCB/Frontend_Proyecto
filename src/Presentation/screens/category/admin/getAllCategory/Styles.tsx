import { StyleSheet, Dimensions } from "react-native";

const {height, width} = Dimensions.get('screen');

const CategoryStyles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: '#fff',
      },

      categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: width*0.04,
        marginTop: height*0.05,
      },

      categoryHeaderText: {
        fontSize: width*0.08,
        fontWeight: '400',
      },

      categoryAddButton: {
        width: width*0.12,
        height: width*0.12,
        borderRadius: width*0.12/2,
      },

      categoryAddButtonImage: {
        width: width*0.12,
        height: width*0.12, 
      },

      categoryList: {
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

      textContainer: {
        flex: 1,
        width : width*0.5,
        height: width*0.25,
        backgroundColor: 'white',
        borderRadius: width*0.02,
        margin: width*0.01,
        padding: width*0.01,
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

      categoryItemButton: {
        padding: width*0.02,
      },

      categoryItemButtonImage: {
        width: width*0.08,
        height: width*0.08,
      },
      
    }
);


export default CategoryStyles;
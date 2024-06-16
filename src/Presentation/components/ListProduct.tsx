import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Product} from "../../Domain/entities/Product";
const { width} = Dimensions.get('screen');

type Props = {
    product: Product;
    addProductToCart: (product: Product) => void;
}


const ListProduct = ({product, addProductToCart}: Props) => {


    const [quantity, setQuantity] = useState(1)

    const increaseQuantity =  async() =>{//async?
        setQuantity(quantity+1)
    }

    const decreaseQuantity = async() =>{
        if(quantity>1){
            setQuantity(quantity-1)
        }
    }

    const handlerAddProductToCart = async () => {
        product.quantity = quantity;
        addProductToCart(product);
    }

    const chileanFormat = (number: number): string => {
        const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `$${formattedNumber}`;
    };

 /*    const showImage = async () => {
        GetProductImagesUseCase(product.id);
        const images = await getProductImages(product.id);
        return images;
    } */

   
    

    return (
        <View style={styles.listItem}>
            <View style={styles.imageContainer}>
                {
                    product.image == null ?
                        <Image source={require('../../../assets/add-picture.png')} style={styles.image} />
                        :
                        
                        <Image source={{uri: product.image[0]}} style={styles.image} />
                        
                }


            </View>

            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.listItemText}>{product.name}</Text>
                    <Text style={styles.listItemText}>{chileanFormat(product.price)}</Text>
                    <Text style={[styles.listItemText, styles.itemTotalPrice]}>Precio total: {chileanFormat(product.price * quantity)}</Text>
                </View>

                <View style={styles.itemActions}>
                    <TouchableOpacity style={styles.itemActionButton} onPress={() => increaseQuantity()}>
                        <Text>+</Text>
                    </TouchableOpacity>
                    <View style={styles.itemQuantity} >
                        <Text>{quantity}</Text>
                    </View>
                    <TouchableOpacity style={styles.itemActionButton}onPress={() => decreaseQuantity()}>
                        <Text>-</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.addItemButtonContainer}>
                <TouchableOpacity style={styles.itemActionButton} onPress={() =>handlerAddProductToCart()}>{/**adCart**/}
                    <Text>+</Text>
                </TouchableOpacity>
            </View>

        </View>
    )


}

// TODO: Remove unused styles

const styles = StyleSheet.create({
    addItemButtonContainer: {
        flex: 1,
        flexGrow: 0.1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    
    itemQuantity: {
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTotalPrice: {
        fontSize: width*0.035,
        fontWeight: 'bold',
        color: 'black',
        margin: width*0.01,
    },
    listItemText: {
        fontSize: width*0.035,
        fontWeight: 'bold',
        color: 'black',
        margin: width*0.01,
    },
})
export default ListProduct;



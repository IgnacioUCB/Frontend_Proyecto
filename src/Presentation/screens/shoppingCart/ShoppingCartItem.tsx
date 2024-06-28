import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import { Product } from '../../../Domain/entities/Product';
import ShoppingCartStyles from './ShoppingCartStyles';


interface ShoppingCartItemProps {
    product: Product;
    remove: (product: Product) => void;
    take:  (product: Product) => void;
    add:  (product: Product) => void;
}

export const ShoppingCartItem = ({ product, remove , take, add}: ShoppingCartItemProps) => {

    return (
        <View style={ShoppingCartStyles.container}>
            <View>
                <Image
                    style={ShoppingCartStyles.image}
                    source={{ uri: product.image }}
                />
            </View>

            <View style={ShoppingCartStyles.productInfo}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={ShoppingCartStyles.title}>{product.name}</Text>
                    <Text style={ShoppingCartStyles.price}>$ {product.price}</Text>


                    <Text style={ShoppingCartStyles.price}>{product.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => take(product)}
                    >
                    <Image
                        source={require('../../../../assets/menos.png')}
                        style={ShoppingCartStyles.addTakeItem}
                        
                    />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => add(product)}
                    >
                    <Image
                        source={require('../../../../assets/mas.png')}
                        style={ShoppingCartStyles.addTakeItem}
                        
                    />
                    </TouchableOpacity>
                </View>
            </View>



            <TouchableOpacity
                onPress={() => remove(product)}
            >
                <Image
                    source={require('../../../../assets/trash.png')}
                    style={ShoppingCartStyles.deleteItem}
                />
            </TouchableOpacity>

        </View>
    )
}
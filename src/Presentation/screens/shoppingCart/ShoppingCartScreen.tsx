import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import { ShoppingCartItem } from './ShoppingCartItem';
import { Product } from '../../../Domain/entities/Product';
import { ClientShoppingCartNavigatorParamsList } from '../../navigator/tabs/client/ClientShoppingCartNavigator';
import { StackScreenProps } from '@react-navigation/stack';


import { ShoppingCartContext } from '../../context/shoppingCart/ShoppingCartContext';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import shoppingCartStyles from './ShoppingCartStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShowCategoryStyles from '../category/client/showCategory/Styles';
import { RoundedButton } from '../../components/RoundedButton';

interface Props extends StackScreenProps<ClientShoppingCartNavigatorParamsList, 'PayScreen'> { }

export const ShoppingCartScreen = ({navigation, route}: Props) => {

    const { userShoppingCart, total, removeProductShoppingCart, takeProductShoppingCart , addProductShoppingCart} = useContext(ShoppingCartContext);


    const removeProduct = async (product: Product) => {
        const response = await removeProductShoppingCart(product);

        if(response){
            showMessage({
                icon: "success",
                message: "Producto eliminado del carrito",
                type: "success"
            
            });
        }
    }

    const takeProduct = async (product: Product) => {
        const response = await takeProductShoppingCart(product);

        if(response){
            showMessage({
                icon: "success",
                message: "Producto sacado del carrito",
                type: "success"
            
            });
        }
    }

    return (
        <SafeAreaView style={shoppingCartStyles.containerList}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Text style={shoppingCartStyles.titleText}>
                    Mi Pedido
                </Text>
             </View>
            
            <Image
                style={shoppingCartStyles.imageBackground}
                source={require('../../../../assets/fondo_pedido.jpg')}
            />
            {
                (userShoppingCart.length === 0) ? (
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>No hay productos en tu carrito</Text>
                )
                    :
                    (
                        <>
                            <FlatList
                                data={userShoppingCart}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <ShoppingCartItem product={item} remove={removeProduct} take={takeProduct} add={addProductShoppingCart}/>}
                            />
                            <View style={shoppingCartStyles.totalToPay}>
                                <View style={shoppingCartStyles.totalInfo}>
                                    <Text style={shoppingCartStyles.totalText}>Total a Pagar</Text>
                                    <Text style={shoppingCartStyles.totalText}>$ {total}</Text>
                                </View>
                            </View>
                            <View style={shoppingCartStyles.containerPay}>
                                <RoundedButton
                                    text='Pagar'
                                    onPress={() => navigation.navigate('PayScreen')}
                                />
                            </View>
                        </>
                    )
            }
        </SafeAreaView>
    )
}


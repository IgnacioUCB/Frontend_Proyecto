import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'

import styles from './Styles';
import { ClientShoppingCartNavigatorParamsList } from '../../../../navigator/tabs/client/ClientShoppingCartNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { ShoppingCartContext } from '../../../../context/shoppingCart/ShoppingCartContext';
import LoadingScreen from "../../../LoadingScreen";
import useViewModel from './ViewModel';
import { ListHeader } from '../../../../components/ListHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListProduct from "../../../../components/ListProduct";
import { Product } from '../../../../../Domain/entities/Product';

interface Props extends StackScreenProps<ClientShoppingCartNavigatorParamsList, 'ProductListScreen'> { }



const ShowProductScreen = ({navigation, route}: Props) => {



  const { showProduct, catProducts, error, loading, setLoading, addProductToCartVM} = useViewModel();

  const userShopping = useContext(ShoppingCartContext).userShoppingCart;
  
  useEffect(() => {
      setLoading(true);
      showProduct(route.params.categoryId);
  }, []);

  if (loading) {
      return <LoadingScreen />;
  } else if (error) {
      return (
          <View>
              <Text style={{marginTop: 80, fontSize: 50}}> Error </Text>
          </View>
      );
  } else if (catProducts.length === 0) {
      return (
          <View style={styles.container}>
            <View>
              <Text style={{marginTop: 80, fontSize: 28, color: 'grey', textAlign: 'center'}}>
                No hay productos. Intentelo más tarde
              </Text>
            </View>
          </View>
      )
  } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <Text style={styles.title}>
              Productos
            </Text>

            <TouchableOpacity >
              
              <Image source={require('../../../../../../assets/shopping_cart.png')} style={{ width: 40, height: 40 }} />
              <Text style={styles.shoppingCartLogo}>{userShopping.length}</Text>
            </TouchableOpacity>

          </View>

          <FlatList
          contentContainerStyle={styles.productList}
          data={catProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
          <ListProduct product={item} addProductToCart={addProductToCartVM} />
          )}
          />
        </SafeAreaView>
      );
    }

}

export default ShowProductScreen;
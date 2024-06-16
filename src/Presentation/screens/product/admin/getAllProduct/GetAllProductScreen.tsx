import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import styles from "./Styles";
import LoadingScreen from "../../../LoadingScreen";
import { RoundedButton } from "../../../../components/RoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import useViewModel from "./ViewModel";
import { ListHeader } from "../../../../components/ListHeader";
import { useFocusEffect } from '@react-navigation/native';

interface Props
  extends StackScreenProps<RootStackParamsList, "GetAllProduct"> {}

export const GetAllProductScreen = ({ navigation, route }: Props) => {
  const { showProduct, products, error, loading, setLoading } = useViewModel();


  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      showProduct(route.params.categoryId);
    }, [])
  );

  if (loading) {
    return <LoadingScreen />;
  } else if (error) {
    return (
      <View>
        <Text style={{ marginTop: 30 }}> Error </Text>
      </View>
    );
  } else if (products?.length === 0) {
    return (
      <View>
      <View style={styles.productHeader}>
        <Text style={styles.productHeaderText}>
          Productos
        </Text>
        <TouchableOpacity
          style={styles.productAddButton}
          onPress={() => {
            navigation.push("CreateProduct", {
              categoryId: route.params.categoryId,
            });
          }}         
          >
          <Image source={require('../../../../../../assets/add.png')}
          style={styles.productAddButtonImage} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{fontSize: 28, color: 'grey'}}>
          No hay productos
        </Text>
      </View>

    </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ListHeader
          title="Productos"
          onAddPress={() => {
            navigation.push("CreateProduct", {
              categoryId: route.params.categoryId,
            });
          }}
        />

        <FlatList
          contentContainerStyle={styles.productList}
          data={products}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.imageContainer}>
                {/*  <Image source={{uri: item.image}} style={styles.image} />  */}
                <Image
                  source={require("../../../../../../assets/add-picture.png")}
                  style={styles.image}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.listItemText}>{item.name}</Text>
                <Text style={styles.listItemText}>{item.price}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.productItemButton}>
                  <Image
                    source={require("../../../../../../assets/pencil.png")}
                    style={styles.productItemButtonImage}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.productItemButton}>
                  <Image
                    source={require("../../../../../../assets/trash.png")}
                    style={styles.productItemButtonImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
};

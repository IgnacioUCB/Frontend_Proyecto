import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { RoundedButton } from "../../../../components/RoundedButton";

import styles from "./Styles";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import CreateProductViewModel from "./ViewModel";
import { Header } from "../../../../components/Header";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import LoadingScreen from "../../../LoadingScreen";

interface Props
  extends StackScreenProps<RootStackParamsList, "CreateProduct"> {}

export const CreateProductScreen = ({ navigation, route }: Props) => {

  //const { }CreateProductScreen
  //const model = CreateProductViewModel(route.params.categoryId);
  const {name, description, price,  onChange, createProduct, images, pickImage, takePhoto, errorMessages, errorsResponse, loading} = CreateProductViewModel(route.params.categoryId);

  const [visibleModalIndex, setVisibleModalIndex] = useState<number | null>(null);


  if(loading){
    return <LoadingScreen />
  } else if(errorsResponse !== undefined && errorsResponse.length > 0){
    return (
      <View>
        <Text style={{marginTop: 50}}> Error </Text>
      </View>
    )
  } else{
  

    return (
    
      <View style={styles.container}>
        <Header title={"Crear Producto"} onGoBackPress={navigation.goBack} />

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100",
          height: "150",
        
        }}>
          {images.map((image, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setVisibleModalIndex(index)}
                
                style={{
                  width: 90,
                  height: 90,
                  margin: 10,
                  borderRadius: 10,
                  backgroundColor: "red",
                }}
                
              >
                 
                {
                  image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 100, height: 100, borderRadius: 10 }}
                    />
                  )
                  
                }
              </TouchableOpacity>
            );
            })
 
          }
        </View>

        <View style={{ ...styles.form, height: "75%" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.formText}>
              Ingrese todos los datos solicitados
            </Text>

            <View style={styles.formInput}>
              <TextInput
                style={styles.formTextInput}
                placeholder={"Ingrese nombre del producto"} //funciona
                keyboardType="default"
                value={name}
                secureTextEntry={false}
                onChangeText={(text) => onChange("name", text)}
              />
            </View>

            {errorMessages.name && <Text style={styles.formError}>{errorMessages.name}</Text>}

            <View style={styles.formInput}>
              <TextInput
                style={styles.formTextInput} //funciona
                placeholder={
                  "Ingrese descripcion del del producto(150 caracteres maximo)"
                }
                keyboardType="default"
                value={description}
                secureTextEntry={false}
                onChangeText={(text) => onChange("description", text)}
              />
            </View>

            {errorMessages.description && <Text style={styles.formError}>{errorMessages.description}</Text>}


            <View style={styles.formInput}>
              <TextInput
                style={styles.formTextInput} //jhjhjh
                placeholder={"Ingrese precio del producto"}
                keyboardType="numeric"
                value={price}
                secureTextEntry={false}
                onChangeText={(text) => onChange("price", text)}
              />
            </View>

            {errorMessages.price && <Text style={styles.formError}>{errorMessages.price}</Text>}


            <View style={{ marginTop: 35 }}>
              <RoundedButton
                text="Confirmar Crear"
                onPress={() => createProduct()}
              />
            </View>
          </ScrollView>
          
        </View>

        <View>
        <ModalPickImage
          modalUseState={visibleModalIndex !== null}
          setModalUseState={(isVisible) => {
            setVisibleModalIndex(isVisible ? visibleModalIndex : null)
          }}
          openGallery={pickImage(visibleModalIndex || 0)} 
          openCamera={takePhoto(visibleModalIndex || 0)}
        />
        </View>
      </View>
    );
  };
}
export default CreateProductScreen;

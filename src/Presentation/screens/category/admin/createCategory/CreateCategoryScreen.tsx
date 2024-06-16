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

export const CreateCategoryScreen = ({ navigation, route }: Props) => {
  //const model = CreateProductViewModel(route.params.categoryId);
    const {name, description, onChange, createCategory, image, pickImage, takePhoto, errorMessages, errorsResponse, loading} = CreateProductViewModel();

    const [modalVisible, setModalVisible] = useState(false);


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
      <Header title={"Crear Categoria"} onGoBackPress={navigation.goBack} />

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
              placeholder={"Ingrese nombre de la categoria"} //funciona
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
                "Ingrese descripcion de la categoria(150 caracteres maximo)"
              }
              keyboardType="default"
              value={description}
              secureTextEntry={false}
              onChangeText={(text) => onChange("description", text)}
            />
          </View>

          {errorMessages.description && <Text style={styles.formError}>{errorMessages.description}</Text>}

          <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.formInput}
                >

                    {
                        (image == '')
                            ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../../../../../assets/add-picture.png')}
                                />
                                <Text style={styles.logoText}>Seleccione una imagen</Text>
                                {
                                    errorMessages.image && (
                                        <Text
                                            style={styles.formError}
                                        >
                                            {errorMessages.image}
                                        </Text>
                                    )
                                }
                            </View>
                            :
                            <Image
                                style={styles.logo}
                                source={{ uri: image }}
                            />
                    }
          </TouchableOpacity>

          <View style={{ marginTop: 35 }}>
            <RoundedButton
              text="Confirmar Crear"
              onPress={() => createCategory()}
            />
          </View>
        </ScrollView>
      </View>

      <ModalPickImage
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                openGallery={pickImage}
                openCamera={takePhoto}
            />
    </View>
  );
}
};

export default CreateCategoryScreen;
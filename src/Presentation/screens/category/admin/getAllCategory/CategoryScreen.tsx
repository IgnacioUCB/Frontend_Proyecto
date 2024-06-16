import React, {useEffect}from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Keyboard, Alert } from 'react-native'
import styles from './Styles';
import LoadingScreen from '../../../LoadingScreen';
import { RoundedButton } from '../../../../components/RoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../navigator/MainAppStack';
import useViewModel from './ViewModel';

interface Props extends StackScreenProps<RootStackParamsList, 'Category'> { }


const CategoryScreen = ({ navigation, route }: Props) => {

  const {showCategory, categories, error, loading, setLoading, deleteCategory } = useViewModel();

  const showAlert = (id: string) =>
    Alert.alert(
      '¿Estás seguro de eliminar esta categoría?',
      'Este cambio no sera reversible',
      [
        {
          text: 'Confimar',
          onPress: () => deleteCategory(id),
          style: 'default',
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      {
        cancelable: false
      },
    )

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      showCategory();
    }, [])
  );

  if(loading){
    return <LoadingScreen />
  } else
  


  if(error){
    return <View>
      <Text style={{marginTop: 50}}> Error </Text>
    </View>
  } else if(categories.length === 0){
    return (
    <View>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>
          Categorias
        </Text>
        <TouchableOpacity
          style={styles.categoryAddButton}
          onPress={() => navigation.navigate('CreateCategory')}
          >
          <Image source={require('../../../../../../assets/add.png')}
          style={styles.categoryAddButtonImage} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{fontSize: 28, color: 'grey'}}>
          No hay categorias
        </Text>
      </View>

    </View>
    )
  } else {

    return (
      <View style={styles.container}>

        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>
            Categorias
          </Text>
          <TouchableOpacity
          style={styles.categoryAddButton}
          onPress={() => navigation.navigate('CreateCategory')}
          >
              <Image source={require('../../../../../../assets/add.png')}
              style={styles.categoryAddButtonImage} />
            </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (

            <TouchableOpacity
            onPress={() => navigation.navigate("GetAllProduct", {categoryId: Number(item.id)})}>

              <View style={styles.listItem}>
                <View style={styles.imageContainer}>
                {
                  item.image == null ? 
                  <Image source={require('../../../../../../assets/add-picture.png')} style={styles.image} />
                  :
                  <Image source={{uri: item.image}} style={styles.image} />
                }

                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.listItemText}>{item.name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.categoryItemButton}>
                    <Image source={require('../../../../../../assets/pencil.png')}
                    style={styles.categoryItemButtonImage}/>
                  </TouchableOpacity>

                  <TouchableOpacity
                  style={styles.categoryItemButton}
                  onPress={() => showAlert(item.id)} >
                    <Image source={require('../../../../../../assets/trash.png')}
                    style={styles.categoryItemButtonImage}/>
                  </TouchableOpacity>
                </View>
              </View>

            </TouchableOpacity>

          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}
export default CategoryScreen
  


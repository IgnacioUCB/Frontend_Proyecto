import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList , useWindowDimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, { useAnimatedScrollHandler, useSharedValue,} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import styles from './Styles';
import LoadingScreen from '../../../LoadingScreen';
import { RoundedButton } from '../../../../components/RoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientShoppingCartNavigatorParamsList } from '../../../../navigator/tabs/client/ClientShoppingCartNavigator';
import useViewModel from './ViewModel';
import {SystemBars} from 'react-native-bars';
import CategoryItem from '../../../../components/CategoryItem';

interface Props extends StackScreenProps<ClientShoppingCartNavigatorParamsList, 'CategoryListScreen'> { }


const ShowCategoryScreen = ({navigation, route}: Props) => {

    const {width} = useWindowDimensions();
    const x = useSharedValue(0);
    const ITEM_WIDTH = 350;
    const ITEM_HEIGHT = 500;
    const MARGin_HORIZONTAL = 20;
    const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGin_HORIZONTAL * 2;
    const SPACER = (width - ITEM_FULL_WIDTH) / 2;

    const {showCategory, categories, error, loading, setLoading } = useViewModel();

    const onScroll = useAnimatedScrollHandler({
      onScroll: event => {
        x.value = event.contentOffset.x;
      },
    });

    /*
    useEffect(() => {
      showCategory();
    }, []);
    */
  
    useFocusEffect(
      React.useCallback(() => {
        setLoading(true);
        showCategory();
      }, [])
    );

    if(loading){
      return <LoadingScreen />
    } else if(categories.length === 0){
      return (
        <View style={styles.container}>
          <Text style={{marginTop: 50, fontSize: 28, color: 'grey'}}>
            No hay categorias
          </Text>
        </View>
      )
    } else {
      return (
          <SafeAreaView style={styles.container}>
            <SystemBars animated={true} barStyle={'light-content'} />

            <View>
              <Text style={{marginTop: 50, fontSize: 28, color: 'black', textAlign: 'center', marginBottom: 50, fontWeight: '400'}}>
                Categorias
              </Text>
            </View>
            
            <Animated.FlatList
              onScroll={onScroll}
              ListHeaderComponent={<View />}
              ListHeaderComponentStyle={{width: SPACER}}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{width: SPACER}}
              data={categories}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                  onPress={() => navigation.navigate("ProductListScreen", {categoryId: Number(item.id)})}>
                    <CategoryItem
                      category={item}
                      index={index}
                      x={x}
                      width={ITEM_WIDTH}
                      height={ITEM_HEIGHT}
                      marginHorizontal={MARGin_HORIZONTAL}
                      fullwidth={ITEM_FULL_WIDTH}
                    />
                  </TouchableOpacity>

                );
              }}
              horizontal
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={ITEM_FULL_WIDTH}
            />
          </SafeAreaView>
      );
  };

}

export default ShowCategoryScreen;
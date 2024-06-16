import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import { Category } from '../../Domain/entities/Category'
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    category: Category;
    index: number;
    width: number;
    height: number;
    marginHorizontal: number;
    x: SharedValue<number>;
    fullwidth: number;
}

const CategoryItem = ({category, index, width, height, marginHorizontal, x, fullwidth}: Props) => {
  //el error que sale aca no afecta en nada la funcionalidad del carrusel
  const animatedStyle = useAnimatedStyle(() => {
    const rotarZ = interpolate(
        x.value, 
        [(index - 1) * fullwidth, index * fullwidth, (index + 1) * fullwidth],
        [20, 0, -20],
        Extrapolation.CLAMP
    )

    const trasladarY = interpolate(
        x.value, 
        [(index - 1) * fullwidth, index * fullwidth, (index + 1) * fullwidth],
        [60, 0, 60],
        Extrapolation.CLAMP   
    )

    return {
        transform: [
            {rotateZ: `${rotarZ}deg`},
            {translateY: trasladarY},
        ]
    }

  });
  return (
    <Animated.View style={[
        styles.container,
        {width: width, height: height, marginHorizontal: marginHorizontal},
        animatedStyle,
        ]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: category.image}} 
        style={[styles.image, {width: width}]} 
        resizeMode='cover'/>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.textName}>{category.name}</Text>
            <Text style={styles.textDesc}>{category.description}</Text>
        </View>
      </View>
    </Animated.View>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'red',
        borderRadius: 12,
        overflow: 'hidden',
        transformOrigin: 'bottom',
        marginTop: 30,
    },
    image:{
        flex: 1,
    },
    imageContainer:{
        flex: 4,
    },
    bottomContainer:{
        flex: 1,
    },
    textContainer:{
        justifyContent: 'center',
        marginHorizontal: 10,

    },
    textName:{
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    textDesc:{
        color: '#FFFFFF',
        fontSize: 16,
    }
})
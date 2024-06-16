import React from 'react'
import { View, Text } from 'react-native';

const MyFirstComponent = () => {
    const myName = "Diego";
  return (
    <View>
        <Text>Hola: {myName}</Text>
    </View>
  )
}

export default MyFirstComponent

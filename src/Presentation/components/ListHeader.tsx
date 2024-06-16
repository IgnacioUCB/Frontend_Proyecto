import React from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

interface Props {
  title: string;
  onAddPress: () => void;
}

export const ListHeader = ({ title, onAddPress }: Props) => {
  return (
    <View style={HeaderStyles.container}>
      <Text style={HeaderStyles.title}>{title}</Text>
      <TouchableOpacity onPress={onAddPress}>
        <Image
          source={require("../../../assets/add.png")}
          style={HeaderStyles.goBackButton}
        />
      </TouchableOpacity>
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    backgroundColor: "white",
    padding: 10,
    paddingTop: 30,
  },
  title: {
    marginLeft: 10,
    fontSize: 30,
    color: "black",
    fontWeight: "500",
  },

  goBackButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.12) / 2,
  },
});

import React from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

interface Props {
  title: string;
  onGoBackPress: () => void;
}

export const Header = ({ title, onGoBackPress }: Props) => {
  return (
    <View style={HeaderStyles.container}>
      <TouchableOpacity onPress={onGoBackPress}>
        <Image
          source={require("../../../assets/back.png")}
          style={HeaderStyles.goBackButton}
        />
      </TouchableOpacity>
      <Text style={HeaderStyles.title}>{title}</Text>
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
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

import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BarraInferior = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.FooterContainer}>
      <View style={styles.FooterView}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.iconContainer}>
            <Entypo name="home" size={80} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Ionicons name="menu" size={80} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BarraInferior;

const styles = StyleSheet.create({
  FooterContainer: {
    backgroundColor: "#1D5E33",
    borderTopWidth: 2,
    borderTopColor: "white",
  },
  FooterView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  iconContainer: {
    marginHorizontal: 50,
  },
});

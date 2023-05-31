import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//! Nombres : adduser,search1
const RouteButton = ({
  nombre = "adduser",
  packageName = "AntDesign",
  size = 90,
  screenName,
}) => {
  const IconComponent = packageName === "AntDesign" ? AntDesign : FontAwesome;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(screenName);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.viewContainer}>
        <IconComponent name={nombre} size={size} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default RouteButton;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    backgroundColor: "#1D5E33",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {},
});

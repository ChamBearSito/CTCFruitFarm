import React from "react";
import { Image, View, StyleSheet } from "react-native";

const BarraSuperior = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoImage}
        source={require("../../assets/Logo.png")}
      />
    </View>
  );
};

export default BarraSuperior;
const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "4%",
    backgroundColor: "#1D5E33",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  logoImage: {
    width: 120,
    height: 120,
    marginVertical: 10,
    marginHorizontal: 30,
  },
});

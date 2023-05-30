import React from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const BarraInferior = () => {
  return (
    <View style={styles.FooterContainer}>
      <View style={styles.FooterView}>
        <View style={{ marginHorizontal: 50 }}>
          <AntDesign name="home" size={100} color="white" />
        </View>
        <View style={{ marginHorizontal: 50 }}>
          <Ionicons name="menu" size={100} color="white" />
        </View>
      </View>
    </View>
  );
};

export default BarraInferior;

const styles = StyleSheet.create({
  FooterContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: "0%",
    backgroundColor: "#1D5E33",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: 120,
    borderTopWidth: 2,
    borderTopColor: "white",
  },
  FooterView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

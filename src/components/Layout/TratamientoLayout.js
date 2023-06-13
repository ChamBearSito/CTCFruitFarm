import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import BarraInferior from "../BarraInferior";
import BarraSuperior from "../BarraSuperior";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const TratamientoLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image
        style={styles.imageBackground}
        source={require("../../../assets/FondodePantalla.png")}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <BarraSuperior />
        <View style={styles.container}>{children}</View>
        <BarraInferior />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default TratamientoLayout;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 200,
    marginHorizontal: 50,
  },
  viewContainer2: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: -160,
    marginHorizontal: 50,
  },
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
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  //   info: {
  //     flex: 1,
  //     position: "absolute",
  //     bottom: "10%",
  //     justifyContent: "center",
  //     alignSelf: "auto",
  //     paddingLeft: 40,
  //     flexDirection: "row",
  //   },
});
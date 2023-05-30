import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import BarraInferior from "../BarraInferior";
import BarraSuperior from "../BarraSuperior";

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image
            style={styles.imageBackground}
            source={require("../../../assets/FondodePantalla.png")}
          />
          <BarraSuperior />

          {children}
        </View>
        {/* VER SI PONEMOS EL BOTON DE INFO EN LA PANTALLA PRINCIPAL O EN EL MODAL DEL MENU */}
        {/* <View style={styles.info}>
        <Text style={{ marginBottom: 40, color: "white" }}>
          <Ionicons name="ios-information-circle" size={40} color="white" />
          Informacion
        </Text>
      </View> */}

        <BarraInferior />

        {/* <View style={styles.FooterContainer}>
        <View style={styles.FooterView}>
          <View style={{ marginHorizontal: 50 }}>
            <AntDesign name="home" size={100} color="white" />
          </View>
          <View style={{ marginHorizontal: 50 }}>
            <Ionicons name="menu" size={100} color="white" />
          </View>
        </View>
      </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Layout;

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

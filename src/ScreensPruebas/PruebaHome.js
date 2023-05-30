import React from "react";
import { StyleSheet, View } from "react-native";

import RouteButton from "../components/RouteButton";

import Layout from "../components/Layout/Layout";

const PruebaHome = () => {
  return (
    <Layout>
      <View style={styles.viewContainer}>
        <RouteButton size={90} />
        <RouteButton nombre="medkit" packageName="FontAwesome " size={90} />
      </View>
      <View style={styles.viewContainer2}>
        <RouteButton nombre="map-o" packageName="FontAwesome " size={90} />
        <RouteButton nombre="briefcase" packageName="FontAwesome " size={90} />
      </View>
      <View style={styles.viewContainer2}>
        <RouteButton nombre="search1" packageName="AntDesign" size={90} />
        <RouteButton nombre="solution1" packageName="AntDesign" size={90} />
      </View>
    </Layout>
  );
};

export default PruebaHome;

const styles = StyleSheet.create({
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
});

// <SafeAreaView style={styles.safeAreaView}>
//   <ScrollView contentContainerStyle={styles.scrollViewContent}>
//     <View style={styles.container}>
//       <Image
//         style={styles.imageBackground}
//         source={require("../../assets/FondodePantalla.png")}
//       />
//       <BarraSuperior />
//       {/* <View style={styles.logoContainer}>
//         <Image
//           style={styles.logoImage}
//           source={require("../../assets/Logo.png")}
//         />
//       </View> */}

//       <View style={styles.viewContainer}>
//         <RouteButton />
//         <RouteButton nombre="medkit" packageName="FontAwesome " />
//       </View>
//       <View style={styles.viewContainer2}>
//         <RouteButton nombre="map-o" packageName="FontAwesome " />
//         <RouteButton nombre="briefcase" packageName="FontAwesome " />
//       </View>
//       <View style={styles.viewContainer2}>
//         <RouteButton nombre="search1" packageName="AntDesign" />
//         <RouteButton nombre="solution1" packageName="AntDesign" />
//       </View>
//     </View>
//     {/* VER SI PONEMOS EL BOTON DE INFO EN LA PANTALLA PRINCIPAL O EN EL MODAL DEL MENU */}
//     {/* <View style={styles.info}>
//       <Text style={{ marginBottom: 40, color: "white" }}>
//         <Ionicons name="ios-information-circle" size={40} color="white" />
//         Informacion
//       </Text>
//     </View> */}

//     <BarraInferior />

//     {/* <View style={styles.FooterContainer}>
//       <View style={styles.FooterView}>
//         <View style={{ marginHorizontal: 50 }}>
//           <AntDesign name="home" size={100} color="white" />
//         </View>
//         <View style={{ marginHorizontal: 50 }}>
//           <Ionicons name="menu" size={100} color="white" />
//         </View>
//       </View>
//     </View> */}
//   </ScrollView>
// </SafeAreaView>

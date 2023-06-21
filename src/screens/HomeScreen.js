import React from "react";
import { StyleSheet, View } from "react-native";
import RouteButton from "../components/RouteButton";
import Layout from "../components/Layout/Layout";
//! Se definieron los 6 botones principales, donde se reutilizo el routeButton,
//!donde se le agrego a cada boton su correspondiente ruta e icono

const HomeSreen = () => {
  return (
    <Layout>
      <View style={styles.viewContainer}>
        <RouteButton size={90} screenName="AltaUsuario" />
        <RouteButton
          nombre="medkit"
          packageName="FontAwesome "
          screenName="TratamientoCurd"
          size={90}
        />
      </View>
      <View style={styles.viewContainer2}>
        <RouteButton
          nombre="map-o"
          packageName="FontAwesome "
          screenName="AltaZona"
          size={90}
        />
        <RouteButton
          nombre="briefcase"
          packageName="FontAwesome "
          screenName="AltaInsumos"
          size={90}
        />
      </View>
      <View style={styles.viewContainer2}>
        <RouteButton
          nombre="search1"
          packageName="AntDesign"
          screenName="ListadoObs"
          size={90}
        />
        <RouteButton
          nombre="solution1"
          packageName="AntDesign"
          screenName="Listado"
          size={90}
        />
      </View>
    </Layout>
  );
};

export default HomeSreen;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 185,
    marginHorizontal: 50,
  },
  viewContainer2: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: -160,
    marginHorizontal: 50,
    marginTop: 30,
  },
});

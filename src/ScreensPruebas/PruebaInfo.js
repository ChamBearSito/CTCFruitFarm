import React from "react";
import Layout from "../components/Layout/Layout";
import { View, Text, StyleSheet, Image } from "react-native";
import RouteButton from "../components/RouteButton";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const PruebaInfo = () => {
  return (
    <Layout>
      <View style={styles.viewInfo}>
        <Text style={styles.titulo}>Informacion</Text>
      </View>
      <View style={[styles.container, { top: "27%" }]}>
        <AntDesign
          style={{ marginHorizontal: 20 }}
          name="adduser"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Usuario`</Text>
      </View>

      <View style={[styles.container, { top: "37%" }]}>
        <FontAwesome
          style={{ marginHorizontal: 20 }}
          name="medkit"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Tratamiento</Text>
      </View>

      <View style={[styles.container, { top: "47%" }]}>
        <FontAwesome
          style={{ marginHorizontal: 30, paddingLeft: -10 }}
          name="map-o"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Zona</Text>
      </View>

      <View style={[styles.container, { top: "57%" }]}>
        <FontAwesome
          style={{ marginHorizontal: 20 }}
          name="briefcase"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Insumos </Text>
      </View>
      <View style={[styles.container, { top: "77%" }]}>
        <AntDesign
          style={{ marginHorizontal: 20 }}
          name="search1"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Observacion</Text>
      </View>
      <View style={[styles.container, { top: "67%" }]}>
        <AntDesign
          style={{ marginHorizontal: 10 }}
          name="solution1"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Listado Pacientes</Text>
      </View>
    </Layout>
  );
};

export default PruebaInfo;

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    width: "100%",
    height: 50,
    // backgroundColor: "#1D5E33",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  viewInfo: {
    position: "absolute",
    alignSelf: "center",
    top: "21%",

    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1D5E33",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D5E33",
  },
});

import React from "react";
import Layout from "../components/Layout/Layout";
import { View, Text, StyleSheet, Image } from "react-native";
import RouteButton from "../components/RouteButton";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const InformationSreen = () => {
  return (
    <Layout>
      <View style={styles.viewInfo}>
        <Text style={styles.titulo}>Información</Text>
      </View>
      <View style={[styles.container, { top: "27%" }]}>
        <AntDesign
          style={styles.icon}
          name="adduser"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Usuario</Text>
      </View>

      <View style={[styles.container, { top: "37%" }]}>
        <FontAwesome
          style={styles.icon}
          name="medkit"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Tratamiento</Text>
      </View>

      <View style={[styles.container, { top: "47%" }]}>
        <FontAwesome
          style={styles.icon}
          name="map-o"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Zona</Text>
      </View>

      <View style={[styles.container, { top: "57%" }]}>
        <FontAwesome
          style={styles.icon}
          name="briefcase"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Insumos </Text>
      </View>
      <View style={[styles.container, { top: "77%" }]}>
        <AntDesign
          style={styles.icon}
          name="search1"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Crear Observacion</Text>
      </View>
      <View style={[styles.container, { top: "67%" }]}>
        <AntDesign
          style={styles.icon}
          name="solution1"
          size={50}
          color="#1D5E33"
        />
        <Text style={styles.subtitulo}>Listado Pacientes</Text>
      </View>
    </Layout>
  );
};

export default InformationSreen;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: 50,
    marginLeft: 70,

    // backgroundColor: "#1D5E33",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
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
  icon: {
    marginRight: 20,
  },
});

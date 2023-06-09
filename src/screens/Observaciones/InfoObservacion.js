import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import ObsContext from "../../provider/observacionProvider";
import ZonaContext from "../../provider/zonaProvider";
import MapView, { Marker } from "react-native-maps";

const InfoObservacion = ({ route }) => {
  const { Obs } = route.params;

  const { state, getZonaById } = useContext(ZonaContext);
  const zona = getZonaById(state, Obs.zona);
  console.log(zona);

  console.log("LA DATA DE OBS", Obs);
  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <FontAwesome name="search" size={100} color="#1D5E33" />
          <Text style={styles.titulo}>{Obs.titulo}</Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: Obs.img }} style={styles.image} />
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.titulo}>Zona</Text>
          <Text style={styles.subtitulo}>
            {zona.id} {zona.depto}
          </Text>
          <Text>
            Lat:{zona.latitude} Lon:{zona.longitude}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.subtitulo}>Ubicacion</Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: zona.latitude,
              longitude: zona.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            }}
          >
            <Marker
              coordinate={{
                latitude: zona.latitude,
                longitude: zona.longitude,
              }}
            />
          </MapView>
        </View>

        <View style={styles.container}>
          <View style={styles.minicontainer}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default InfoObservacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Agrega espacio horizontal en los extremos del formulario
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center", // Ajusta el espacio entre el componente Layout y el formulario
  },
  distancia: {
    marginTop: 110,
  },

  viewInfo: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 50,
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
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1D5E33",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    backgroundColor: "#1D5E33",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    paddingHorizontal: 5,
  },
  minicontainer: {
    flexDirection: "row",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "#1D5E33",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  map: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderWidth: 5,
    borderColor: "black",
  },
});

import React, { useState, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import ModalMensaje from "../../components/ModalMensaje";
import ZonaContext from "../../provider/zonaProvider";
import { useNavigation } from "@react-navigation/native";

const InfoZona = ({ route }) => {
  const navigation = useNavigation();
  const { dispatch } = useContext(ZonaContext);
  const { zona } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <FontAwesome name="map-o" size={150} color="#1D5E33" />
          <Text style={styles.titulo}>{zona.lugar}</Text>
          <Text style={styles.titulo}>{zona.depto}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Trabajadores</Text>
          <Text style={styles.titulo}>{zona.trabajadores}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.subtitulo}>Ubicacion</Text>
          <Text>
            Lat: {zona.latitude} Lon: {zona.longitude}
          </Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: zona.latitude,
              longitude: zona.longitude,
              latitudeDelta: 1,
              longitudeDelta: 0.07,
            }}
          >
            {zona.latitude && zona.longitude && (
              <Marker
                coordinate={{
                  latitude: zona.latitude,
                  longitude: zona.longitude,
                }}
              />
            )}
          </MapView>
        </View>

        <View style={styles.container}>
          <View style={styles.minicontainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                dispatch({ type: "deleteZona", payload: zona });
                setModalMensaje("Zona Eliminada");
                setShowModal(true);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate("AltaZona", zona);
              }}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showModal && (
        <ModalMensaje
          mensaje={modalMensaje}
          closeModal={handleModalClose}
          navega={false}
        />
      )}
    </Layout>
  );
};

export default InfoZona;

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
  map: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderWidth: 5,
    borderColor: "black",
  },
});

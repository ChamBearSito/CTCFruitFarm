import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import MapView, { Marker } from "react-native-maps";

import Dropdown from "../../components/Dropdown";
import { getDistance } from "geolib";
import ModalMensaje from "../../components/ModalMensaje";

import { useRoute } from "@react-navigation/native";
import ZonaContext from "../../provider/zonaProvider";
import axios from "axios";

const ZoneCrud = () => {
  const { dispatch } = useContext(ZonaContext);
  const [location, setLocation] = useState("Selecciona una Ubicación");
  const [place, setPlace] = useState(undefined);
  const [trabajadores, settrabajadores] = useState("");

  const [latitude, setLatitude] = useState(-34.312977);
  const [longitude, setLongitude] = useState(-57.230646);

  //El route es por si recibe un usuario significa que es para editar no
  // para hacer alta
  const route = useRoute();

  let theZona = {
    id: "",
    lugar: place,
    trabajadores: trabajadores,
    depto: location,
    latitude: latitude,
    longitude: longitude,
  };

  route.params ? (theZona = route.params) : [];
  // console.log(theZona);
  useEffect(() => {
    console.log(location);
  }, [location]);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );

      const { country, state } = await response.data.address;
      setLocation(`${state}, ${country}`);
    } catch (error) {
      console.warn(error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLocationSelect = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
    reverseGeocode(latitude, longitude);
  };

  const handleSubmit = () => {
    console.log("Lugar seleccionado:", place);
    console.log("Departamento seleccionado:", departamento);
    console.log("Latitud:", latitude);
    console.log("Longitud:", longitude);
  };

  const Lugares = [
    { label: "Estancia", value: "Estancia" },
    { label: "Quinta", value: "Quinta" },
    { label: "Plantación ", value: "Plantación" },
  ];

  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>
            {theZona.id ? "Editar" : "Alta"} Zona
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Lugar</Text>
          <Dropdown
            label={theZona.id ? theZona.lugar : "Lugar"}
            data={Lugares}
            onSelect={(selected) => setPlace(selected.value)}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Departamento</Text>

          <Text>{theZona.id ? theZona.depto : location}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Trabajadores</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Ingrese cantidad de Trabajadores"
            placeholderTextColor="#888"
            defaultValue={theZona.trabajadores.toString()}
            onChangeText={(text) => {
              settrabajadores(text);
            }}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Ubicacion</Text>

          <MapView
            style={styles.map}
            initialRegion={
              theZona.id
                ? {
                    latitude: theZona.latitude,
                    longitude: theZona.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                  }
                : {
                    latitude: -34.312977,
                    longitude: -57.230646,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                  }
            }
            onPress={handleLocationSelect}
          >
            <Marker
              coordinate={
                theZona.id
                  ? { latitude: theZona.latitude, longitude: theZona.longitude }
                  : { latitude, longitude }
              }
              draggable
              onDragEnd={handleLocationSelect}
            />
          </MapView>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              let action = "";
              let mensaje = "";

              {
                theZona.id ? (action = "updateZona") : (action = "createZona");
              }
              dispatch({ type: action, payload: theZona });
              theZona.id
                ? (mensaje = "Zona Editada")
                : (mensaje = "Zona Creada");

              setModalMensaje(mensaje);
              setShowModal(true);
            }}
          >
            <Text style={styles.buttonText}>
              {theZona.id ? "Editar" : "Crear"} Zona
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showModal && (
        <ModalMensaje mensaje={modalMensaje} closeModal={handleModalClose} />
      )}
    </Layout>
  );
};

export default ZoneCrud;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  distancia: {
    marginTop: 100,
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#1D5E33",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D5E33",
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
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderWidth: 5,
    borderColor: "black",
  },
});

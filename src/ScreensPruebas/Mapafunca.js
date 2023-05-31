import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ModalDropdown from "react-native-modal-dropdown";
import MapView, { Marker } from "react-native-maps";

const MapaFunca = () => {
  const [place, setPlace] = useState("");
  const [Departamento, setDepartamento] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handlePlaceChange = (value) => {
    setPlace(value);
  };

  const handleDepartamentoChange = (value) => {
    setDepartamento(value);
  };

  const handleLocationSelect = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleSubmit = () => {
    console.log("Lugar seleccionado:", place);
    console.log("Departamento seleccionado:", Departamento);
    console.log("Latitud:", latitude);
    console.log("Longitud:", longitude);
  };

  const departamentoOptions = [
    "Artigas",
    "Canelones",
    "Cerro Largo",
    "Colonia",
    "Durazno",
    "Flores",
    "Florida",
    "Lavalleja",
    "Maldonado",
    "Montevideo",
    "Paysandú",
    "Río Negro",
    "Rivera",
    "Rocha",
    "Salto",
    "San José",
    "Soriano",
    "Tacuarembó",
    "Treinta y Tres",
  ];

  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Alta Zona</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Lugar</Text>
          <ModalDropdown
            options={["Estancia", "Quinta", "Plantación"]}
            defaultValue="Selecciona un lugar"
            onSelect={handlePlaceChange}
            textStyle={{ fontSize: 30 }}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Departamento</Text>
          <ModalDropdown
            options={departamentoOptions}
            defaultValue="Selecciona un Depto"
            onSelect={handleDepartamentoChange}
            textStyle={{ fontSize: 30 }}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Trabajadores</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Ingrese cantidad de Trabajadores"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Ubicacion</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -34.312977,
              longitude: -57.230646,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            }}
            onPress={handleLocationSelect}
          >
            {latitude && longitude && (
              <Marker
                coordinate={{ latitude, longitude }}
                draggable
                onDragEnd={handleLocationSelect}
              />
            )}
          </MapView>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Crear Zona</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default MapaFunca;

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
  },
});

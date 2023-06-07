import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import MapView, { Marker } from "react-native-maps";
import ModalDropdown from "../../components/Dropdown";
import Dropdown from "../../components/Dropdown";
import { getDistance } from "geolib";

const ZoneCrud = () => {
  const [place, setPlace] = useState(undefined);
  const [departamento, setDepartamento] = useState(
    "Selecciona en el Mapa una Ubicación"
  );
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationSelect = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
    const departamentoEncontrado = getDepartamento(latitude, longitude);
    setDepartamento(departamentoEncontrado);
  };

  const handleSubmit = () => {
    console.log("Lugar seleccionado:", place);
    console.log("Departamento seleccionado:", departamento);
    console.log("Latitud:", latitude);
    console.log("Longitud:", longitude);
  };
  // const departamentoOptions = [
  //   "Artigas",
  //   "Canelones",
  //   "Cerro Largo",
  //   "Colonia",
  //   "Durazno",
  //   "Flores",
  //   "Florida",
  //   "Lavalleja",
  //   "Maldonado",
  //   "Montevideo",
  //   "Paysandú",
  //   "Río Negro",
  //   "Rivera",
  //   "Rocha",
  //   "Salto",
  //   "San José",
  //   "Soriano",
  //   "Tacuarembó",
  //   "Treinta y Tres",
  // ];

  const departamentoOptions = [
    { label: "Artigas", value: "Artigas" },
    { label: "Canelones", value: "Canelones" },
    { label: "Cerro Largo", value: "Cerro Largo" },
    { label: "Colonia", value: "Colonia" },
    { label: "Durazno", value: "Durazno" },
    { label: "Flores", value: "Flores" },
    { label: "Florida", value: "Florida" },
    { label: "Lavalleja", value: "Lavalleja" },
    { label: "Maldonado", value: "Maldonado" },
    { label: "Montevideo", value: "Montevideo" },
    { label: "Paysandú", value: "Paysandú" },
    { label: "Río Negro", value: "Río Negro" },
    { label: "Rivera", value: "Rivera" },
    { label: "Rocha", value: "Rocha" },
    { label: "Salto", value: "Salto" },
    { label: "San José", value: "San José" },
    { label: "Soriano", value: "Soriano" },
    { label: "Tacuarembó", value: "Tacuarembó" },
    { label: "Treinta y Tres", value: "Treinta y Tres" },
  ];

  const Lugares = [
    { label: "Estancia", value: "Estancia" },
    { label: "Quinta", value: "Quinta" },
    { label: "Plantación ", value: "Plantación" },
  ];
  const apiKey = "TU_API_KEY";

  const getDepartamento = (latitude, longitude) => {
    // Coordenadas de los departamentos de Uruguay
    const departamentos = {
      Artigas: { latitude: -30.4016, longitude: -56.4722 },
      Canelones: { latitude: -34.7167, longitude: -56.2167 },
      Cerro_Largo: { latitude: -32.8097, longitude: -53.5197 },
      Colonia: { latitude: -34.4607, longitude: -57.8409 },
      Durazno: { latitude: -33.4132, longitude: -56.5006 },
      Flores: { latitude: -33.5284, longitude: -56.8984 },
      Florida: { latitude: -34.0997, longitude: -56.2142 },
      Lavalleja: { latitude: -34.3228, longitude: -55.2375 },
      Maldonado: { latitude: -34.8825, longitude: -54.9597 },
      Montevideo: { latitude: -34.9033, longitude: -56.1882 },
      Paysandú: { latitude: -32.3214, longitude: -58.0756 },
      Río_Negro: { latitude: -32.7314, longitude: -57.6083 },
      Rivera: { latitude: -30.9036, longitude: -55.5508 },
      Rocha: { latitude: -34.4836, longitude: -54.3417 },
      Salto: { latitude: -31.3833, longitude: -57.9667 },
      San_José: { latitude: -34.3375, longitude: -56.7139 },
      Soriano: { latitude: -33.125, longitude: -58.3042 },
      Tacuarembó: { latitude: -31.718, longitude: -55.985 },
      Treinta_y_Tres_: { latitude: -33.225, longitude: -54.3833 },
    };

    let departamentoEncontrado = "";
    let distanciaMinima = Infinity;

    if (latitude && longitude) {
      // Buscar el departamento correspondiente a las coordenadas
      for (const [key, value] of Object.entries(departamentos)) {
        const distance = getDistance(
          { latitude: value.latitude, longitude: value.longitude },
          { latitude, longitude }
        );
        // Si la distancia es menor a 100 kilómetros, considerarlo como el departamento correcto
        if (distance < distanciaMinima) {
          distanciaMinima = distance;
          departamentoEncontrado = key;
        }
      }
    }
    console.log("Departamento:", departamentoEncontrado);
    return departamentoEncontrado;
  };
  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Alta Zona</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Lugar</Text>
          <Dropdown label="Lugar" data={Lugares} onSelect={setPlace} />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Departamento</Text>
          {/* <ModalDropdown
            options={departamentoOptions}
            defaultValue="Selecciona un Depto"
            onSelect={handleDepartamentoChange}
            textStyle={{ fontSize: 30 }}
          /> */}

          {/* <Dropdown
            label="Departamento"
            data={departamentoOptions}
            onSelect={setDepartamento}
          /> */}

          <Text>{departamento}</Text>
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

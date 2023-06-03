import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import MapView, { Marker } from "react-native-maps";
import ModalDropdown from "../../components/Dropdown";
import Dropdown from "../../components/Dropdown";

const ZoneCrud = () => {
  const [place, setPlace] = useState(undefined);
  const [Departamento, setDepartamento] = useState(undefined);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

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

          <Dropdown
            label="Departamento"
            data={departamentoOptions}
            onSelect={setDepartamento}
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

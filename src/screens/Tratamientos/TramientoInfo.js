import React from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const TratamientoInfo = ({ route }) => {
  const { Tratamiento } = route.params;
  console.log(Tratamiento);
  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <FontAwesome name="medkit" size={150} color="#1D5E33" />
          <Text style={styles.titulo}>
            {Tratamiento.nombre} {Tratamiento.apellido}
          </Text>
          <Text style={styles.subtitulo2}>Tratamiento</Text>
          <Text style={styles.subtitulo}>{Tratamiento.tratamiento}</Text>
          <Text style={styles.subtitulo2}>Fecha Tratamiento</Text>
          <Text style={styles.subtitulo}>{Tratamiento.fechaT}</Text>
          <Text style={styles.subtitulo2}>Observaciones</Text>
          <Text style={styles.subtitulo}>{Tratamiento.observaciones}</Text>
          <Text style={styles.subtitulo2}>C.I</Text>
          <Text style={styles.subtitulo}>{Tratamiento.ci}</Text>
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

export default TratamientoInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Agrega espacio horizontal en los extremos del formulario
    marginTop: 20,
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
  subtitulo2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
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
    marginTop: 20,
    flexDirection: "row",
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
});

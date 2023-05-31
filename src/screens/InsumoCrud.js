import React from "react";
import Layout from "../components/Layout/Layout";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const InsumoCrud = () => {
  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Alta Insumo</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Nombre</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Ingrese su Nombre"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Cantidad</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Ingrese cantidad"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Crear Insumo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default InsumoCrud;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Agrega espacio horizontal en los extremos del formulario
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center", // Ajusta el espacio entre el componente Layout y el formulario
  },
  distancia: {
    marginTop: 150,
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
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
});

import React, { useReducer, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { UserProvider } from "../../provider/userProvider";
import UserContext from "../../provider/userProvider";

const UserCrud = () => {
  // const { dispatch } = useContext(UserContext);

  return (
    <UserProvider>
      <Layout>
        <View style={styles.distancia}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Alta Usuario</Text>
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
            <Text style={styles.subtitulo}>Apellido</Text>
            <TextInput
              keyboardType="default"
              style={styles.input}
              placeholder="Ingrese su Apellido"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.subtitulo}>Cédula</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Ingrese su Cédula"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Crear Usuario</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    </UserProvider>
  );
};

export default UserCrud;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Agrega espacio horizontal en los extremos del formulario
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center", // Ajusta el espacio entre el componente Layout y el formulario
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

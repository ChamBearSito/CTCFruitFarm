import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import InsumoContext from "../../provider/insumoProvider";
import ModalMensaje from "../../components/ModalMensaje";

const InsumoCrud = () => {
  const { dispatch } = useContext(InsumoContext);
  //El route es por si recibe un usuario significa que es para editar no
  // para hacer alta
  const route = useRoute();

  let theInsumo = {
    id: "",
    nombre: "",
    cantidad: "",
  };

  route.params ? (theInsumo = route.params) : [];
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>
            {theInsumo.id ? "Editar" : "Alta"} Insumo
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Nombre</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Ingrese Nombre"
            placeholderTextColor="#888"
            defaultValue={theInsumo.nombre}
            onChangeText={(text) => {
              theInsumo.nombre = text;
            }}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Cantidad</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Ingrese cantidad"
            placeholderTextColor="#888"
            defaultValue={theInsumo.cantidad.toString()}
            onChangeText={(text) => {
              theInsumo.cantidad = text;
            }}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              let action = "";
              let mensaje = "";
              //esto compara si tiene id, significa que hay un user para editar
              {
                theInsumo.id
                  ? (action = "updateInsumo")
                  : (action = "createInsumo");
              }
              dispatch({ type: action, payload: theInsumo });
              theInsumo.id
                ? (mensaje = "Insumo editado")
                : (mensaje = "Insumo Creado");

              setModalMensaje(mensaje);
              setShowModal(true);
            }}
          >
            <Text style={styles.buttonText}>
              {theInsumo.id ? "Editar" : "Alta"} Insumo
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
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
});

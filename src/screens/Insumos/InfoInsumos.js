import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import InsumoContext from "../../provider/insumoProvider";

import ModalMensaje from "../../components/ModalMensaje";

const InsumoInfo = ({ route }) => {
  const { insumos } = route.params;
  console.log(insumos);
  const navigation = useNavigation();
  const { dispatch } = useContext(InsumoContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <FontAwesome name="briefcase" size={150} color="#1D5E33" />
          <Text style={styles.titulo}>ID: {insumos.id}</Text>
          <Text style={styles.titulo}>{insumos.nombre}</Text>
          <Text style={styles.titulo}>Litros: {insumos.cantidad}</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.minicontainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                dispatch({ type: "deleteInsumo", payload: insumos });
                setModalMensaje("Insumo Eliminado");
                setShowModal(true);
              }}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate("AltaInsumos", insumos);
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
          navega={true}
        />
      )}
    </Layout>
  );
};

export default InsumoInfo;

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

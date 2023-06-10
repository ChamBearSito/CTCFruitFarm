import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ModalDropdown from "react-native-modal-dropdown";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import Dropdown from "../../components/Dropdown";
import ModalMensaje from "../../components/ModalMensaje";

import { useRoute } from "@react-navigation/native";

import ZonaContext from "../../provider/zonaProvider";
import ObsContext from "../../provider/observacionProvider";

const ObservationCrud = () => {
  const { dispatch } = useContext(ObsContext);
  // const [Titulo, setTitulo] = useState(undefined);
  // const [zona, setZona] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Se requiere acceso a la biblioteca de medios para seleccionar una foto."
      );
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      theOb.img = result.assets[0].uri;
    }
  };
  const route = useRoute();

  let laOb = {
    id: "",
    titulo: "",
    zona: "",
    img: "",
  };
  const [theOb] = useState(route.params ? route.params : laOb);

  useEffect(() => {
    if (theOb.id) {
      setSelectedImage(theOb.img);
    }
  }, []);

  const titulooption = [
    { label: "Planta en mal estado", value: "Planta en mal estado" },
    { label: "Plaga detectada", value: "Plaga detectada" },
    { label: "Falta de riego ", value: "Falta de riego" },
  ];

  const { state, getZonaById } = useContext(ZonaContext);
  const laZona = getZonaById(state, theOb.zona);

  const zonasOptions = state.map((item) => ({
    label: `${item.id} ${item.lugar} ${item.depto}`,
    value: item.id,
  }));

  return (
    <Layout>
      {state.length > 0 ? (
        <View style={styles.distancia}>
          <View style={styles.container}>
            <Text style={styles.titulo}>
              {theOb.id ? "Editar" : "Alta"} Observacion
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.subtitulo}>Titulo</Text>
            {/* <ModalDropdown
            options={[
              "Plaga detectada",
              "Planta en mal estado",
              "Falta de riego)",
            ]}
            defaultValue="Seleccione Titulo"
            onSelect={handlePlaceChange}
            textStyle={{ fontSize: 30 }}
          /> */}

            <Dropdown
              label={theOb.id ? theOb.titulo : "Titulo"}
              data={titulooption}
              onSelect={(selected) => (theOb.titulo = selected.value)}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.subtitulo}>Zona</Text>
            <Dropdown
              label={
                theOb.id
                  ? `${laZona.id} ${laZona.lugar} ${laZona.depto}`
                  : "Zona"
              }
              data={zonasOptions}
              onSelect={(selected) => (theOb.zona = selected.value)}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.subtitulo}>Imagen</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.image} />
              ) : (
                <Text style={styles.placeholderText}>Seleccionar foto</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                let action = "";
                let mensaje = "";

                {
                  theOb.id ? (action = "updateObs") : (action = "createObs");
                }
                dispatch({ type: action, payload: theOb });
                theOb.id ? (mensaje = "Obs Editada") : (mensaje = "Obs Creada");

                setModalMensaje(mensaje);
                setShowModal(true);
              }}
            >
              <Text style={styles.buttonText}>
                {theOb.id ? "Editar" : "Crear"} Observacion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.distancia}>
          <Text
            style={[styles.titulo, { marginTop: 100, paddingHorizontal: 2 }]}
          >
            No Puedes Hacer un Alta de Observaciones sin Zonas previamente
            Creadas
          </Text>
        </View>
      )}

      {showModal && (
        <ModalMensaje mensaje={modalMensaje} closeModal={handleModalClose} />
      )}
    </Layout>
  );
};

export default ObservationCrud;

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
    fontSize: 30,
    fontWeight: "bold",
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: "#1D5E33",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
});

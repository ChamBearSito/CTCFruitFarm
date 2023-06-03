import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ModalDropdown from "react-native-modal-dropdown";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import Dropdown from "../../components/Dropdown";

const ObservationCrud = () => {
  const [Titulo, setTitulo] = useState(undefined);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleLocationSelect = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleSubmit = () => {
    console.log("Lugar seleccionado:", place);
    console.log("Departamento seleccionado:", Departamento);
    console.log("Latitud:", latitude);
    console.log("Longitud:", longitude);
  };
  const titulooption = [
    { label: "Planta en mal estado", value: "Planta en mal estado" },
    { label: "Plaga detectada", value: "Plaga detectada" },
    { label: "Falta de riego ", value: "Falta de riego" },
  ];

  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Alta Observacion</Text>
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

          <Dropdown label="Titulo" data={titulooption} onSelect={setTitulo} />
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
            <Text style={styles.buttonText}>Crear Observacion</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  map: {
    width: "100%",
    height: 200,
    marginTop: 20,
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

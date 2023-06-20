import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Dropdown from "../../components/Dropdown";
import ModalMensaje from "../../components/ModalMensaje";
import { useRoute } from "@react-navigation/native";
import ZonaContext from "../../provider/zonaProvider";
import ObsContext from "../../provider/observacionProvider";
import { useFormik } from "formik";
import * as yup from "yup";

const ObservationCrud = () => {
  const { dispatch } = useContext(ObsContext);
  // const [Titulo, setTitulo] = useState(undefined);
  // const [zona, setZona] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const [laZona, setlaZona] = useState("");
  const validationSchema = yup.object().shape({
    titulo: yup
      .string()
      .required("El Titulo es requerido")
      .matches(/^[A-Za-z\s]+$/, "El Titulo no puede contener números"),
    img: yup.string().required("La Imagen es requerida"),
  });

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
      formik.setFieldValue("img", result.assets[0].uri);
    }
  };
  const route = useRoute();
  const { zona } = route.params;
  console.log("param Obs:", route.params);
  let laOb = {
    id: "",
    titulo: "",
    zonaId: zona ? zona.id : "",
    img: "",
  };
  const [theOb] = useState(route.params.lugar ? laOb : route.params);
  console.log("LA ZONA: ", zona);
  theOb.zonaId = zona.id;
  useEffect(() => {
    if (theOb.id) {
      setSelectedImage(theOb.img);
    }
  }, []);
  useEffect(() => {
    console.log("theOb", theOb);
  }, [theOb]);

  const titulooption = [
    { label: "Planta en mal estado", value: "Planta en mal estado" },
    { label: "Plaga detectada", value: "Plaga detectada" },
    { label: "Falta de riego ", value: "Falta de riego" },
  ];

  const formik = useFormik({
    initialValues: {
      titulo: theOb.titulo,
      img: theOb.img,
    },
    validationSchema,
    onSubmit: (values) => {
      let action = "";
      let mensaje = "";

      if (theOb.id) {
        action = "updateObs";
        mensaje = "Observación editada";
      } else {
        action = "createObs";
        mensaje = "Observación creada";
      }

      dispatch({ type: action, payload: { ...theOb, ...values } });
      setModalMensaje(mensaje);
      setShowModal(true);
    },
  });
  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>
            {theOb.id ? "Editar" : "Alta"} Observacion
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.titulo}>Zona</Text>
          <Text style={styles.subtitulo}>
            Id:{laOb.zonaId} {zona.lugar} {zona.depto}
          </Text>
          <Text style={[styles.subtitulo, { marginTop: 20 }]}>Titulo</Text>

          <Dropdown
            label={theOb.id ? theOb.titulo : "Titulo"}
            data={titulooption}
            onSelect={(selected) => {
              theOb.titulo = selected.value;
              formik.setFieldValue("titulo", selected.value);
              formik.setFieldTouched("titulo", true);
            }}
          />
          {formik.touched.titulo && formik.errors.titulo && (
            <Text style={styles.errorText}>{formik.errors.titulo}</Text>
          )}
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
          {formik.touched.img && formik.errors.img && (
            <Text style={styles.errorText}>{formik.errors.img}</Text>
          )}
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={formik.handleSubmit}
            // onPress={() => {
            //   let action = "";
            //   let mensaje = "";

            //   {
            //     theOb.id ? (action = "updateObs") : (action = "createObs");
            //   }
            //   dispatch({ type: action, payload: theOb });
            //   theOb.id ? (mensaje = "Obs Editada") : (mensaje = "Obs Creada");

            //   setModalMensaje(mensaje);
            //   setShowModal(true);
            // }}
          >
            <Text style={styles.buttonText}>
              {theOb.id ? "Editar" : "Crear"} Observacion
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
  },
});

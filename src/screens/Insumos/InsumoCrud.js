import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import Layout from "../../components/Layout/Layout";
import InsumoContext from "../../provider/insumoProvider";
import ModalMensaje from "../../components/ModalMensaje";

const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[A-Za-z\s]+$/, "El nombre no puede contener números"),
  cantidad: yup
    .number()
    .typeError("No puedes Agregar Letras, Solo numeros")
    .required("La cantidad es requerida")
    .positive("La cantidad debe ser mayor a cero"),
  // .integer("La cantidad debe ser un número entero"),
});

const InsumoCrud = () => {
  const { dispatch } = useContext(InsumoContext);
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

  let theInsumo = {
    id: "",
    nombre: "",
    cantidad: "",
  };

  route.params ? (theInsumo = route.params) : [];

  const formik = useFormik({
    initialValues: {
      nombre: theInsumo.nombre,
      cantidad: theInsumo.cantidad.toString(),
    },
    validationSchema,
    onSubmit: (values) => {
      let action = "";
      let mensaje = "";

      if (theInsumo.id) {
        action = "updateInsumo";
        mensaje = "Insumo editado";
      } else {
        action = "createInsumo";
        mensaje = "Insumo creado";
      }

      dispatch({ type: action, payload: { ...theInsumo, ...values } });
      setModalMensaje(mensaje);
      setShowModal(true);
    },
  });

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
            onChangeText={formik.handleChange("nombre")}
            onBlur={formik.handleBlur("nombre")}
            value={formik.values.nombre}
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <Text style={styles.errorText}>{formik.errors.nombre}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Cantidad</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ingrese cantidad"
            placeholderTextColor="#888"
            onChangeText={formik.handleChange("cantidad")}
            onBlur={formik.handleBlur("cantidad")}
            value={formik.values.cantidad}
          />
          {formik.touched.cantidad && formik.errors.cantidad && (
            <Text style={styles.errorText}>{formik.errors.cantidad}</Text>
          )}
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={formik.handleSubmit}
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
    paddingHorizontal: 20,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
  },
});

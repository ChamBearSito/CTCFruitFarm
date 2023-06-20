import React, { useReducer, useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import UserContext from "../../provider/userProvider";
import { useRoute } from "@react-navigation/native";
import ModalMensaje from "../../components/ModalMensaje";
import { useFormik } from "formik";
import * as yup from "yup";
const UserCrud = () => {
  const { dispatch } = useContext(UserContext);

  const validationSchema = yup.object().shape({
    nombre: yup
      .string()
      .typeError("No puedes Agregar Numeros, Solo Letras")
      .required("El Nombre es requerido")
      .matches(/^[A-Za-z\s]+$/, "El nombre no puede contener números"),
    apellido: yup
      .string()
      .typeError("No puedes Agregar Numeros, Solo Letras")
      .required("El Apellido es requerido")
      .matches(/^[A-Za-z\s]+$/, "El Apellido no puede contener números"),

    cedula: yup
      .number()
      .typeError("No puedes Agregar Letras, Solo numeros")
      .required("La cedula es requerida")
      .positive("La cedula debe ser mayor a cero")
      // .matches(/^\d{7,8}$/, "La cédula debe tener 7 u 8 números")
      .test("length", "La cédula debe tener exactamente 8 números", (value) => {
        return /^\d{8}$/.test(value);
      })
      .integer("La cedula debe ser un número entero"),
  });

  //El route es por si recibe un usuario significa que es para editar no
  // para hacer alta
  const route = useRoute();

  let theUser = {
    id: "",
    nombre: "",
    apellido: "",
    cedula: "",
  };

  route.params ? (theUser = route.params) : [];

  const formik = useFormik({
    initialValues: {
      nombre: theUser.nombre,
      apellido: theUser.apellido,
      cedula: theUser.cedula,
    },
    validationSchema,
    onSubmit: (values) => {
      let action = "";
      let mensaje = "";

      if (theUser.id) {
        action = "updateUser";
        mensaje = "Usuario editado";
      } else {
        action = "createUser";
        mensaje = "Usuario creado";
      }

      dispatch({ type: action, payload: { ...theUser, ...values } });
      setModalMensaje(mensaje);
      setShowModal(true);
    },
  });

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
            {theUser.id ? "Editar" : "Alta"} Usuario
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Nombre</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            defaultValue={theUser.nombre}
            onChangeText={formik.handleChange("nombre")}
            onBlur={formik.handleBlur("nombre")}
            value={formik.values.nombre}
            placeholder="Ingrese su Nombre"
            placeholderTextColor="#888"
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <Text style={styles.errorText}>{formik.errors.nombre}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Apellido</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            defaultValue={theUser.apellido}
            onChangeText={formik.handleChange("apellido")}
            onBlur={formik.handleBlur("apellido")}
            value={formik.values.apellido}
            placeholder="Ingrese su Apellido"
            placeholderTextColor="#888"
          />
          {formik.touched.apellido && formik.errors.apellido && (
            <Text style={styles.errorText}>{formik.errors.apellido}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Cédula</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            defaultValue={theUser.cedula.toString()}
            onChangeText={formik.handleChange("cedula")}
            onBlur={formik.handleBlur("cedula")}
            value={formik.values.cedula}
            placeholder="Ingrese su Cédula"
            placeholderTextColor="#888"
          />
          {formik.touched.cedula && formik.errors.cedula && (
            <Text style={styles.errorText}>{formik.errors.cedula}</Text>
          )}
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.buttonText}>
              {theUser.id ? "Editar" : "Crear"} Usuario
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
  },
});

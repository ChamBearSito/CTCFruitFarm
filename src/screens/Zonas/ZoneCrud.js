import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import Dropdown from "../../components/Dropdown";
import ModalMensaje from "../../components/ModalMensaje";
import { useRoute } from "@react-navigation/native";
import ZonaContext from "../../provider/zonaProvider";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const ZoneCrud = () => {
  //#region //! ValidationSchema
  const validationSchema = yup.object().shape({
    lugar: yup.string().required("El Lugar es requerido"),

    trabajadores: yup
      .number()
      .typeError("No puedes Agregar Letras, Solo numeros")
      .required("La cantidad es requerida")
      .positive("La cantidad debe ser mayor a cero")
      .integer("La cantidad debe ser un número entero"),
    depto: yup.string().required("El departamento es requerido"),
  });
  //#endregion
  const route = useRoute();
  //! Traemos dispach de el ZonaContext
  const { dispatch } = useContext(ZonaContext);
  //#region  //! Estado Location (pais y departamento o provincia), ademas de el useEffect del mismo setLocation
  const [location, setLocation] = useState("Seleccione una ubicacion");
  useEffect(() => {
    if (theZona.id) {
      setLocation(theZona.depto);
    }
  }, []);
  //#endregion

  let laZona = {
    id: "",
    lugar: "",
    trabajadores: "",
    depto: "",
    latitude: "",
    longitude: "",
  };

  const [theZona] = useState(route.params ? route.params : laZona);
  //#region //! Formik
  const formik = useFormik({
    initialValues: {
      lugar: laZona.lugar,
      trabajadores: laZona.trabajadores,
      depto: laZona.depto,
    },
    validationSchema,
    onSubmit: (values) => {
      let action = "";
      let mensaje = "";

      if (theZona.id) {
        action = "updateZona";
        mensaje = "Zona editada";
      } else {
        action = "createZona";
        mensaje = "Zona creada";
      }

      dispatch({ type: action, payload: { ...theZona, ...values } });
      setModalMensaje(mensaje);
      setShowModal(true);
    },
  });
  //#endregion

  //#region //! Estado de Longitud y Latitud
  const [latitude, setLatitude] = useState(-34.312977);
  const [longitude, setLongitude] = useState(-57.230646);
  //#endregion

  //#region //! GEOCODING PARA CONSEGUIR INFO DEL LAS COORDENADAS
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );

      const { country, state } = await response.data.address;
      theZona.latitude = latitude;
      theZona.longitude = longitude;
      setLocation(`${state}, ${country}`);
      formik.setFieldTouched("depto", true);
      formik.setFieldValue("depto", `${state}, ${country}`);

      theZona.depto = `${state}, ${country}`;
    } catch (error) {
      console.warn(error);
    }
  };
  //#endregion

  //#region //! Estados ModalMensaje
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };
  //#endregion

  //#region //! handleLocationSelect
  const handleLocationSelect = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
    reverseGeocode(latitude, longitude);
  };
  //#endregion

  //#region //! Opciones Lugares
  const Lugares = [
    { label: "Estancia", value: "Estancia" },
    { label: "Quinta", value: "Quinta" },
    { label: "Plantación ", value: "Plantación" },
  ];
  //#endregion

  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>
            {theZona.id ? "Editar" : "Alta"} Zona
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Lugar</Text>
          <Dropdown
            label={theZona.id ? theZona.lugar : "Lugar"}
            data={Lugares}
            onBlur={formik.handleBlur("lugar")}
            value={formik.values.lugar}
            onSelect={(selected) => {
              theZona.lugar = selected.value;
              formik.setFieldValue("lugar", selected.value);
              formik.setFieldTouched("lugar", true);
            }}
          />
          {formik.touched.lugar && formik.errors.lugar && (
            <Text style={styles.errorText}>{formik.errors.lugar}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Departamento</Text>

          <Text>{location}</Text>

          {formik.touched.depto && formik.errors.depto && (
            <Text style={styles.errorText}>{formik.errors.depto}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Trabajadores</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Ingrese cantidad de Trabajadores"
            placeholderTextColor="#888"
            defaultValue={theZona.id ? theZona.trabajadores.toString() : ""}
            onChangeText={formik.handleChange("trabajadores")}
            onBlur={formik.handleBlur("trabajadores")}
          />
          {formik.touched.trabajadores && formik.errors.trabajadores && (
            <Text style={styles.errorText}>{formik.errors.trabajadores}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.subtitulo}>Ubicacion</Text>

          <MapView
            style={styles.map}
            initialRegion={
              theZona.id
                ? {
                    latitude: parseFloat(theZona.latitude),
                    longitude: parseFloat(theZona.longitude),
                    latitudeDelta: 5.0,
                    longitudeDelta: 5.0,
                  }
                : {
                    latitude: -32.522779,
                    longitude: -55.765835,
                    latitudeDelta: 5.0,
                    longitudeDelta: 5.0,
                  }
            }
            onPress={handleLocationSelect}
          >
            <Marker
              coordinate={
                theZona.id
                  ? {
                      latitude: parseFloat(theZona.latitude),
                      longitude: parseFloat(theZona.longitude),
                    }
                  : { latitude, longitude }
              }
              draggable
              onDragEnd={handleLocationSelect}
            />
          </MapView>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.buttonText}>
              {theZona.id ? "Editar" : "Crear"} Zona
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

export default ZoneCrud;

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
    fontSize: 40,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderWidth: 5,
    borderColor: "black",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
  },
});

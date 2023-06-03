import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Dropdown from "../../components/Dropdown";

const TratamientoCrud = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedDate1, setSelectedDate1] = useState();
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    setSelectedDate1(date);
    hideDatePicker1();
  };

  const [usuario, setusuario] = useState(undefined);

  const [zona, setzona] = useState(undefined);

  const [Insumos, setInsumos] = useState(undefined);

  const [Obs, setObs] = useState(undefined);
  const optionsUsuarios = [
    { label: "Miguel Dominguez", value: "Miguel Dominguez" },
    { label: "Osvaldo Machado", value: "Osvaldo Machado" },
    { label: "Elisa Smith", value: "Elisa Smith" },
  ];

  const optionsZona = [
    { label: "Colonia Valdense", value: "Colonia Valdense" },
    { label: "Nueva Helvecia", value: "Nueva Helvecia" },
    { label: "Juan Lacaze", value: "Juan Lacaze" },
  ];

  const optionsInsumos = [
    { label: "Fertilizante 300lt", value: "Fertilizante 300lt" },
    { label: "Monsatnto 23lt", value: "Monsatnto 23lt" },
    { label: "Aceite NAtural 34lt", value: "Aceite NAtural 34lt" },
  ];

  const optionsObs = [
    { label: "Obs #1: Plaga Detectada", value: "Obs #1: Plaga Detectada" },
    { label: "Obs #2: Falta de Riego", value: "Obs #2: Falta de Riego" },
    {
      label: "Obs #3: Planta en Mal Estado",
      value: "Obs #3: Planta en Mal Estado",
    },
  ];
  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Alta Tratamiento</Text>
        </View>
        <View style={styles.container}>
          {/* //! IDentificador y Nombre / */}
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Identificación</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Ingrese Identificacion"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Nombre</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Ingrese Nombre"
              placeholderTextColor="#888"
            />
          </View>
        </View>

        {/* //! Zona y Usuario / */}
        <View style={{ marginTop: 10 }}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Zona</Text>
            <Dropdown label="Zona" data={optionsZona} onSelect={setzona} />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Usuarios</Text>
            <Dropdown
              label="Usuario"
              data={optionsUsuarios}
              onSelect={setusuario}
            />
          </View>
        </View>

        {/* //! Fecha Inicio y FechaFin / */}
        <View style={styles.container}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Fecha Inicio</Text>
            <Text>{`Fecha:  ${
              selectedDate1
                ? moment(selectedDate1).format("MM/DD/YYYY")
                : "Please select date"
            }`}</Text>
            <Button
              color="#1D5E33"
              title="Fecha Inicio"
              onPress={showDatePicker1}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              mode="date"
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
            />
          </View>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Fecha Fin</Text>
            <Text>{`Fecha:  ${
              selectedDate
                ? moment(selectedDate).format("MM/DD/YYYY")
                : "Please select date"
            }`}</Text>
            <Button
              color="#1D5E33"
              title="Fecha Fin"
              onPress={showDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>

        <View style={styles.container}>
          {/* //! Tiempo y Orden de Trabajo / */}
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Tiempo</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Ingrese Tiempo"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Orden de Trabajo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese Orden"
              placeholderTextColor="#888"
            />
          </View>
        </View>

        {/* //! Insumos y Observaciones / */}
        <View style={{ marginTop: 10 }}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Insumos</Text>
            <Dropdown
              label="Insumos"
              data={optionsInsumos}
              onSelect={setInsumos}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Observaciones</Text>
            {/* <Modal> */}
            <Dropdown
              label="Observaciones"
              data={optionsObs}
              onSelect={setObs}
            />
            {/* </Modal> */}
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Crear Tratamiento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default TratamientoCrud;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10, // Agrega espacio horizontal en los extremos del formulario
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center", // Ajusta el espacio entre el componente Layout y el formulario
    flexDirection: "row",
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#1D5E33",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D5E33",
    textAlign: "center",
  },
  icon: {
    marginRight: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1D5E33",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#1D5E33",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  elseparador: {
    marginHorizontal: 5,
  },
});

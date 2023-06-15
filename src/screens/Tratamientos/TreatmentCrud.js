import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import TratamientoLayout from "../../components/Layout/TratamientoLayout";
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
import ModalMensaje from "../../components/ModalMensaje";
import * as DocumentPicker from "expo-document-picker";

import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import TratContext from "../../provider/tratamientoProvider";
import ZonaContext from "../../provider/zonaProvider";
import UserContext from "../../provider/userProvider";
import InsumoContext from "../../provider/insumoProvider";
import MultipleSelect from "react-native-multiple-select";

const TratamientoCrud = () => {
  const route = useRoute();
  const { dispatch } = useContext(TratContext);
  const { state: EstadoZona, getZonaById } = useContext(ZonaContext);
  const { state: EstadoUsuarios, getUserById } = useContext(UserContext);
  const { state: EstadoInsumos } = useContext(InsumoContext);

  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedDate1, setSelectedDate1] = useState();
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permiso denegado para acceder a la biblioteca de medios.");
    }
  };

  useEffect(() => {
    const requestPermission = async () => {
      try {
        await requestMediaLibraryPermission();
      } catch (error) {
        console.log("Error al solicitar permisos:", error);
        // Manejar el error de permisos aquí
      }
    };

    requestPermission();
    if (theTratamiento.id) {
      setInsumos(theTratamiento.insumo);
      if (theTratamiento.orden) {
        setSelectedFile(theTratamiento.orden);
      }
    }
  }, []);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (result.type === "success") {
      setSelectedFile(result.uri);
      theTratamiento.orden = result.uri;
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    theTratamiento.fechafin = date.toISOString();
    hideDatePicker();
  };

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    theTratamiento.fechainicial = date.toISOString();
    hideDatePicker1();
  };

  const [usuario, setusuario] = useState(undefined);
  const [nombre, setnombre] = useState(undefined);

  const [zona, setzona] = useState(undefined);
  const [tiempo, settiempo] = useState(undefined);

  const [Insumos, setInsumos] = useState([]);

  const [Obs, setObs] = useState(undefined);

  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
  };
  const optionsUsuarios = EstadoUsuarios.map((item) => ({
    label: `${item.id} ${item.nombre} ${item.apellido} ${item.cedula}`,
    value: item.id,
  }));

  const optionsZona = EstadoZona.map((item) => ({
    label: `${item.id} ${item.lugar} ${item.depto}`,
    value: item.id,
  }));

  const optionsInsumos = EstadoInsumos.map((item) => ({
    label: `${item.id} ${item.nombre} ${item.cantidad}`,
    value: item.id,
  }));

  let elTratamiento = {
    id: "",
    nombre: "",
    zona: "",
    usuario: "",
    insumo: [],
    fechainicial: "",
    fechafin: "",
    tiempo: "",
    orden: "",
  };

  // elTratamiento.insumo = Insumos;
  // elTratamiento.usuario = usuario;
  // elTratamiento.nombre = nombre;
  // elTratamiento.zona = zona;
  // elTratamiento.fechainicial = selectedDate1;
  // elTratamiento.fechafin = selectedDate;
  // elTratamiento.tiempo = tiempo;
  // elTratamiento.orden = selectedFile.uri;

  const [theTratamiento] = useState(
    route.params ? route.params : elTratamiento
  );

  const laZona = getZonaById(EstadoZona, theTratamiento.zona);
  const elUser = getUserById(EstadoUsuarios, theTratamiento.usuario);

  // Estado para controlar la visibilidad del modal
  const [showInsumosModal, setShowInsumosModal] = useState(false);

  // Función para abrir el modal
  const openInsumosModal = () => {
    setShowInsumosModal(true);
  };

  // Función para cerrar el modal
  const closeInsumosModal = () => {
    setShowInsumosModal(false);
  };

  // Función para manejar los insumos seleccionados
  const handleInsumosSelection = (selectedItems) => {
    // Actualiza el estado con los insumos seleccionados
    setInsumos(selectedItems);
  };

  useEffect(() => {
    console.log("QUE VA CAMBIANDO", theTratamiento);
  }, [theTratamiento]);
  return (
    <TratamientoLayout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>
            {theTratamiento.id ? "Editar" : "Alta"} Tratamiento
          </Text>
        </View>
        <View style={styles.container}>
          {/* //! IDentificador y Nombre / */}
          {/* <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Identificación</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Ingrese Identificacion"
              placeholderTextColor="#888"
            />
          </View> */}
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Nombre</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Ingrese Nombre"
              placeholderTextColor="#888"
              defaultValue={
                theTratamiento.nombre ? theTratamiento.nombre.toString() : ""
              }
              onChangeText={(text) => {
                theTratamiento.nombre = text;
              }}
              // onChangeText={(text) => setnombre(text)}
            />
          </View>
        </View>

        {/* //! Zona y Usuario / */}
        <View style={{ marginTop: 10 }}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Zona</Text>
            <Dropdown
              label={
                theTratamiento.id
                  ? `${laZona.id} ${laZona.lugar} ${laZona.depto}`
                  : "Zona"
              }
              data={optionsZona}
              onSelect={(selected) => (theTratamiento.zona = selected.value)}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Usuarios</Text>
            <Dropdown
              label={
                theTratamiento.id
                  ? `${elUser.id} ${elUser.nombre} ${elUser.apellido} ${elUser.cedula} `
                  : "Usuario"
              }
              data={optionsUsuarios}
              onSelect={(selected) => (theTratamiento.usuario = selected.value)}
            />
          </View>
        </View>

        {/* //! Insumos / */}
        <View style={{ marginTop: 10 }}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Insumos</Text>
            {/* <Dropdown
              label="Insumos"
              data={optionsInsumos}
              onSelect={setInsumos}
            /> */}
            <Button
              color="#1D5E33"
              title={"Seleccionar Insumos"}
              onPress={openInsumosModal}
            />
            <Modal
              visible={showInsumosModal}
              onRequestClose={closeInsumosModal}
              transparent={true}
            >
              <View style={styles.modalContainer}>
                <MultipleSelect
                  items={optionsInsumos}
                  uniqueKey="value"
                  onSelectedItemsChange={setInsumos}
                  selectedItems={Insumos}
                  selectText="Seleccionar Insumos"
                  searchInputPlaceholderText="Buscar insumos..."
                  tagRemoveIconColor="#1D5E33"
                  tagBorderColor="#1D5E33"
                  tagTextColor="#1D5E33"
                  selectedItemTextColor="#1D5E33"
                  selectedItemIconColor="#1D5E33"
                  itemTextColor="#000"
                  displayKey="label"
                  searchInputStyle={{ color: "#1D5E33" }}
                  submitButtonColor="#1D5E33"
                  submitButtonText="Seleccionar"
                />
                <Button
                  color="#1D5E33"
                  title="Confirmar"
                  onPress={closeInsumosModal}
                />
              </View>
            </Modal>
          </View>
        </View>

        {/* //! Fecha Inicio y FechaFin / */}
        <View style={styles.container}>
          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Fecha Inicio</Text>
            <Text>{`Fecha:  ${
              theTratamiento.fechainicial
                ? moment(theTratamiento.fechainicial).format("MM/DD/YYYY")
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
              theTratamiento.fechafin
                ? moment(theTratamiento.fechafin).format("MM/DD/YYYY")
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
              defaultValue={
                theTratamiento.tiempo ? theTratamiento.tiempo.toString() : ""
              }
              onChangeText={(text) => {
                theTratamiento.tiempo = text;
              }}
            />
          </View>
        </View>
        <View style={styles.container}>
          {/* //! Orden de Trabajo / */}

          <View style={styles.elseparador}>
            <Text style={styles.subtitulo}>Orden de Trabajo</Text>

            <Button
              color="#1D5E33"
              title="Seleccionar Archivo"
              onPress={pickDocument}
            />
            {selectedFile && (
              <>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: selectedFile }} style={styles.image} />
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              let action = "";
              let mensaje = "";
              theTratamiento.insumo = Insumos;
              {
                theTratamiento.id
                  ? (action = "updateTratamiento")
                  : (action = "createTratamiento");
              }
              dispatch({ type: action, payload: theTratamiento });
              theTratamiento.id
                ? (mensaje = "Tratamiento Editado")
                : (mensaje = "Tratamiento Creado");

              setModalMensaje(mensaje);
              setShowModal(true);
            }}
          >
            <Text style={styles.buttonText}>
              {theTratamiento.id ? "Editar" : "Crear"} Tratamiento
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showModal && (
        <ModalMensaje mensaje={modalMensaje} closeModal={handleModalClose} />
      )}
    </TratamientoLayout>
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
  modalContainer: {
    padding: 20,
    marginTop: 210,
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: "#1D5E33",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "#1D5E33",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "space-around",
    width: "180%",
    height: 200,
    marginVertical: 20,
    marginLeft: "-40%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

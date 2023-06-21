import React, { useState, useContext } from "react";
import { SwipeRow } from "react-native-swipe-list-view";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraInferior from "../../components/BarraInferior";
import BarraSuperior from "../../components/BarraSuperior";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ModalMensaje from "../../components/ModalMensaje";
import TratContext from "../../provider/tratamientoProvider";

const ListTreataments = () => {
  const navigation = useNavigation();
  //! Traemos el estado y el dispach desde el contexto porque los necesitamos para eliminar
  const { state, dispatch } = useContext(TratContext);
  //#region //! Navegacion a Editar(TratamientoCrud) mandandole el Tratamiento
  const handleTratamentPress = (Tratamiento) => {
    navigation.navigate("InfoTratamiento", { Tratamiento });
  };
  //#endregion
  //#region //! Estados ModalMensaje
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };
  //#endregion

  //#region //! Función para renderizar cada item de la lista
  const renderTratamientoItem = ({ item }) => (
    <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
      <View style={styles.standaloneRowBack}>
        <TouchableOpacity
          style={styles.botonesr}
          onPress={() => {
            dispatch({ type: "deleteTratamientos", payload: item });
            setModalMensaje("Tratamiento Eliminado");
            setShowModal(true);
          }}
        >
          <Text style={{ color: "white" }}>Borrar</Text>
          <FontAwesome5 name="trash" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonesa}
          onPress={() => {
            navigation.navigate("TratamientoCurd", item);
          }}
        >
          <Text style={{ color: "white" }}>Editar</Text>
          <FontAwesome5 name="edit" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.standaloneRowFront}>
        <TouchableOpacity onPress={() => handleTratamentPress(item)}>
          <View style={styles.itemContainer}>
            <FontAwesome
              style={{ marginLeft: 10 }}
              name="medkit"
              size={60}
              color="#1D5E33"
            />
            <Text style={styles.itemSubtitle}>
              {item.tratamiento} {item.nombre} {item.apellido}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SwipeRow>
  );
  //#endregion
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <BarraSuperior />
      <View style={styles.container}>
        <Text style={styles.titulo}>Tratamientos</Text>
      </View>
      <View style={styles.line} />

      {state.length > 0 ? (
        <View style={styles.scrollViewContent}>
          <FlatList
            style={styles.FlatList}
            data={state}
            renderItem={renderTratamientoItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.line} />}
          />
          <View style={styles.line} />
        </View>
      ) : (
        <View style={styles.scrollViewContent}>
          <Text style={[styles.titulo, { marginLeft: 20, marginTop: 100 }]}>
            Aun no hay Tratamientos
          </Text>
        </View>
      )}
      {state.length > 0 ? (
        <TouchableOpacity
          style={styles.verMapaButton}
          onPress={() => navigation.navigate("Mapa")}
        >
          <Ionicons name="earth" size={80} color="#1D5E33" />
          <Text style={styles.titulo}>Ver en Mapa</Text>
        </TouchableOpacity>
      ) : null}

      {showModal && (
        <ModalMensaje
          mensaje={modalMensaje}
          closeModal={handleModalClose}
          navega={false}
        />
      )}

      <BarraInferior />
    </SafeAreaView>
  );
};

export default ListTreataments;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1D5E33",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  itemSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D5E33",
    marginLeft: 10,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#cedda9",
  },
  scrollViewContent: {
    flex: 1,
  },
  FlatList: {
    flex: 1,
  },
  verMapaButton: {
    alignItems: "center",
    marginTop: 5,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  standaloneRowBack: {
    alignItems: "center",

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  backTextWhite: {
    color: "#FFF",
  },
  standaloneRowFront: {
    alignItems: "center",
    backgroundColor: "#cedda9",
    justifyContent: "center",
  },
  botonesr: {
    borderRadius: 10,
    marginRight: 3,
    backgroundColor: "red",
    padding: 8,
    flexDirection: "row",
  },
  botonesa: {
    borderRadius: 10,
    marginLeft: 3,
    backgroundColor: "orange",
    padding: 8,
    flexDirection: "row",
  },
});

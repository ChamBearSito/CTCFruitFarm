import React, { useState, useContext } from "react";
import { SwipeRow } from "react-native-swipe-list-view";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import BarraInferior from "../../components/BarraInferior";
import BarraSuperior from "../../components/BarraSuperior";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ObsContext from "../../provider/observacionProvider";
import ModalMensaje from "../../components/ModalMensaje";

const ListaObservaciones = () => {
  const navigation = useNavigation();
  //#region //! Navegacion a Editar(ObsCrud) mandandole el Obs
  const handleObsPress = (Obs) => {
    navigation.navigate("ObsInfo", { Obs });
  };
  //#endregion

  //#region //! Estados ModalMensaje
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };
  //#endregion

  //! Traemos el estado y el dispach desde el contexto porque los necesitamos para eliminar
  const { state, dispatch } = useContext(ObsContext);

  //#region //! Función para renderizar cada item de la lista
  const renderTratamientoItem = ({ item }) => (
    <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
      <View style={styles.standaloneRowBack}>
        <TouchableOpacity
          style={styles.botonesr}
          onPress={() => {
            dispatch({ type: "deleteObs", payload: item });
            setModalMensaje("Obs Eliminada");
            setShowModal(true);
          }}
        >
          <Text style={{ color: "white" }}>Borrar</Text>
          <FontAwesome5 name="trash" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonesa}
          onPress={() => {
            navigation.navigate("AltaObservacion", item);
          }}
        >
          <Text style={{ color: "white" }}>Editar</Text>
          <FontAwesome5 name="edit" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.standaloneRowFront}>
        <TouchableOpacity onPress={() => handleObsPress(item)}>
          <View style={styles.itemContainer}>
            <FontAwesome
              style={{ marginLeft: 10 }}
              name="search"
              size={60}
              color="#1D5E33"
            />
            <Text style={styles.itemSubtitle}>
              {item.id} {item.titulo} {item.latitud}
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
        <Text style={styles.titulo}>Observaciones</Text>
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
        </View>
      ) : (
        <View style={styles.scrollViewContent}>
          <Text style={[styles.titulo, { marginLeft: 20, marginTop: 100 }]}>
            Aun no hay Observaciones
          </Text>
        </View>
      )}

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

export default ListaObservaciones;

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

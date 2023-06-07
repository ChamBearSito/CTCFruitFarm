import React, { useState, useContext } from "react";
import Layout from "../../components/Layout/Layout";
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
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BarraInferior from "../../components/BarraInferior";
import BarraSuperior from "../../components/BarraSuperior";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import InsumoContext from "../../provider/insumoProvider";
import ModalMensaje from "../../components/ModalMensaje";

const ListaInsumos = () => {
  const navigation = useNavigation();
  const handleObsPress = (insumos) => {
    navigation.navigate("InfoInsumo", { insumos });
  };

  // Array de usuarios del contexto
  const { state, dispatch } = useContext(InsumoContext);

  // Función para renderizar cada item de la lista
  const renderInsumoItem = ({ item }) => (
    <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
      <View style={styles.standaloneRowBack}>
        <TouchableOpacity
          style={styles.botonesr}
          onPress={() => {
            dispatch({ type: "deleteInsumo", payload: item });
            setModalMensaje("Insumo Eliminado");
            setShowModal(true);
          }}
        >
          <Text style={{ color: "white" }}>Borrar</Text>
          <FontAwesome5 name="trash" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonesa}
          onPress={() => {
            navigation.navigate("AltaInsumos", item);
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
              name="briefcase"
              size={60}
              color="#1D5E33"
            />
            <Text style={styles.itemSubtitle}>
              {item.id} {item.nombre} {item.cantidad}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SwipeRow>

    // <TouchableOpacity onPress={() => handleTratamentPress(item)}>
    //   <View style={styles.itemContainer}>
    //     <FontAwesome
    //       style={{ marginLeft: 10 }}
    //       name="medkit"
    //       size={60}
    //       color="#1D5E33"
    //     />
    //     <Text style={styles.itemSubtitle}>
    //       {item.tratamiento} {item.nombre} {item.apellido}
    //     </Text>
    //   </View>
    // </TouchableOpacity>
  );

  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* <Image
        style={styles.imageBackground}
        source={require("../../../assets/FondodePantalla.png")}
      /> */}
      <BarraSuperior />

      <View style={styles.container}>
        <Text style={styles.titulo}>Insumos</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.scrollViewContent}>
        <FlatList
          style={styles.FlatList}
          data={state}
          renderItem={renderInsumoItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />
      </View>

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

export default ListaInsumos;

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

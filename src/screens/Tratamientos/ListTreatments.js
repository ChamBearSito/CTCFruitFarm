import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
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

const ListTreataments = () => {
  const navigation = useNavigation();
  const handleTratamentPress = (Tratamiento) => {
    navigation.navigate("InfoTratamiento", { Tratamiento });
  };

  const [tratamientos, settratamientos] = useState(
    // Array de tratamientos de ejemplo
    [
      {
        id: 1,
        nombre: "Luis",
        apellido: "Miguel",
        tratamiento: "T-46545",
        fechaT: "24/03/2023",
        observaciones: "Zi",
        ci: 635351,
      },
      {
        id: 2,
        nombre: "Sergio",
        apellido: "Rico",
        tratamiento: "T-34345",
        fechaT: "24/09/2021",
        observaciones: "No",
        ci: 54878,
      },
      {
        id: 3,
        nombre: "Ana",
        apellido: "García",
        tratamiento: "T-12345",
        fechaT: "12/06/2023",
        observaciones: "Sí",
        ci: 784536,
      },
      {
        id: 4,
        nombre: "Carlos",
        apellido: "Pérez",
        tratamiento: "T-67890",
        fechaT: "05/02/2023",
        observaciones: "No",
        ci: 963214,
      },
      {
        id: 5,
        nombre: "María",
        apellido: "López",
        tratamiento: "T-24680",
        fechaT: "30/11/2022",
        observaciones: "Sí",
        ci: 745812,
      },
      {
        id: 6,
        nombre: "Pedro",
        apellido: "Gómez",
        tratamiento: "T-13579",
        fechaT: "18/08/2023",
        observaciones: "No",
        ci: 874563,
      },
      {
        id: 7,
        nombre: "Laura",
        apellido: "Hernández",
        tratamiento: "T-97531",
        fechaT: "22/04/2022",
        observaciones: "Sí",
        ci: 632548,
      },
    ]
  );

  // Función para renderizar cada item de la lista
  const renderTratamientoItem = ({ item }) => (
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
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image
        style={styles.imageBackground}
        source={require("../../../assets/FondodePantalla.png")}
      />
      <BarraSuperior />

      <View style={styles.container}>
        <Text style={styles.titulo}>Tratamientos</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.scrollViewContent}>
        <FlatList
          style={styles.FlatList}
          data={tratamientos}
          renderItem={renderTratamientoItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.verMapaButton}>
        <Ionicons name="earth" size={80} color="#1D5E33" />
        <Text style={styles.titulo}>Ver en Mapa</Text>
      </TouchableOpacity>

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
});

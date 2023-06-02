import React, { useState } from "react";

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

const ListadoUsuarios = () => {
  const navigation = useNavigation();

  const handleUserPress = (usuario) => {
    navigation.navigate("InfoUser", { usuario });
  };

  // Array de tratamientos de ejemplo
  const [Usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Luis",
      apellido: "Suarez",
      cedula: 455454,
      numero: "#0001",
    },
    {
      id: 2,
      nombre: "JUANITO",
      apellido: "JIJIJA",
      cedula: 4564664,
      numero: "#0002",
    },
    {
      id: 3,
      nombre: "Marceliño",
      apellido: "Albariño",
      cedula: 584864,
      numero: "#0003",
    },
    {
      id: 4,
      nombre: "MARCELA",
      apellido: "Cavani",
      cedula: 8476354,
      numero: "#0004",
    },
    {
      id: 5,
      nombre: "OSVALDO",
      apellido: "Chambonardo",
      cedula: 4564664,
      numero: "#0005",
    },
    {
      id: 6,
      nombre: "YESSICA",
      apellido: "Mimosha",
      cedula: 456797,
      numero: "#0006",
    },
  ]);

  // Función para renderizar cada item de la lista
  const renderUsuariosItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View style={styles.itemContainer}>
        <AntDesign name="user" size={60} color="#1D5E33" />
        <Text style={styles.itemSubtitle}>
          {item.numero} {item.nombre}
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
        <Text style={styles.titulo}>Usuarios</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.scrollViewContent}>
        <FlatList
          style={styles.FlatList}
          data={Usuarios}
          renderItem={renderUsuariosItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />
        <View style={styles.line} />
      </View>

      <BarraInferior />
    </SafeAreaView>
  );
};

export default ListadoUsuarios;

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

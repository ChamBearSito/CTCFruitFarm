import React from "react";
import Layout from "../components/Layout/Layout";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const PruebaListado = () => {
  // Array de tratamientos de ejemplo
  const tratamientos = [
    { id: 1, nombre: "MICHELO", numero: "#0001" },
    { id: 2, nombre: "JUANITO", numero: "#0002" },
    { id: 3, nombre: "PEPITO", numero: "#0003" },
    { id: 4, nombre: "MACELA", numero: "#0004" },
  ];

  // Función para renderizar cada item de la lista
  const renderTratamientoItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <AntDesign name="user" size={60} color="#1D5E33" />
        <Text style={styles.itemSubtitle}>
          {item.numero} {item.nombre}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Tratamientos</Text>
        </View>
        <View style={styles.line} />

        <View>
          <FlatList
            style={styles.FlatList}
            data={tratamientos}
            renderItem={renderTratamientoItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.line} />}
          />
          <View style={styles.line} />
        </View>

        <TouchableOpacity>
          <View style={styles.container2}>
            <Ionicons name="earth" size={80} color="#1D5E33" />

            <Text style={[styles.titulo, { marginTop: 30 }]}>Ver en Mapa</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default PruebaListado;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    alignSelf: "flex-end",
    paddingHorizontal: 60,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    paddingVertical: "auto",
    justifyContent: "space-between",
  },
  distancia: {
    marginTop: 100,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1D5E33",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D5E33",
    marginLeft: 10,
  },
});

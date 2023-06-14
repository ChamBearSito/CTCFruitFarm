import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import UserContext from "../../provider/userProvider";
import ObsContext from "../../provider/observacionProvider";
import ZonaContext from "../../provider/zonaProvider";
import { useNavigation } from "@react-navigation/native";
import InsumoContext from "../../provider/insumoProvider";
import TratContext from "../../provider/tratamientoProvider";
import ModalMensaje from "../../components/ModalMensaje";
import { useRoute } from "@react-navigation/native";

const TratamientoInfo = () => {
  const route = useRoute();
  const { Tratamiento } = route.params;
  const navigation = useNavigation();
  const { dispatch } = useContext(TratContext);

  console.log("QUE TRAE TRATAMIENTO: ", Tratamiento);
  const fechaInicial = new Date(Tratamiento.fechainicial);
  const dia = fechaInicial.getDate();
  const mes = fechaInicial.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por eso se suma 1
  const anio = fechaInicial.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${anio}`;

  const { state: EstadoUsuarios, getUserById } = useContext(UserContext);
  const { state: EstadoObs, getObsById } = useContext(ObsContext);
  const { state: EstadoZona, getZonaById } = useContext(ZonaContext);
  const { state: EstadoInsumo, getInsumoById } = useContext(InsumoContext);
  const elusuario = getUserById(EstadoUsuarios, Tratamiento.usuario);
  const lasObservaciones = getObsById(EstadoObs, Tratamiento.zona);
  const lazona = getZonaById(EstadoZona, Tratamiento.zona);
  const elInsumo = getInsumoById(EstadoInsumo, Tratamiento.insumo);
  console.log("EL INSUMO XD: ", elInsumo);

  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <View style={styles.distancia}>
        <View style={styles.container}>
          <FontAwesome name="medkit" size={150} color="#1D5E33" />
          <Text style={styles.titulo}>
            {elusuario.nombre}
            {elusuario.apellido}
          </Text>
          <Text style={styles.subtitulo2}>Tratamiento</Text>
          <Text style={styles.subtitulo}>T-{Tratamiento.id}</Text>
          <Text style={styles.subtitulo2}>Fecha Tratamiento</Text>
          <Text style={styles.subtitulo}>{fechaFormateada}</Text>
          <Text style={styles.subtitulo2}>Zona Tratamiento</Text>

          <Text style={styles.subtitulo}>
            {lazona.id} {lazona.depto}
          </Text>
          <Text style={styles.subtitulo2}>Observaciones</Text>
          {lasObservaciones.length > 0 ? (
            <ScrollView>
              <View>
                <View
                  style={{
                    marginHorizontal: 70,
                    backgroundColor: "white",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#1D5E33",
                  }}
                >
                  {lasObservaciones.map((Obs) => (
                    <View key={Obs.id} style={styles.itemContainer}>
                      <TouchableOpacity
                        style={styles.observaciones1}
                        onPress={() => navigation.navigate("ObsInfo", { Obs })}
                      >
                        <Text style={styles.subtitulo}>{Obs.titulo}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.subtitulo}>No hay Observaciones</Text>
            </View>
          )}
          <Text style={styles.subtitulo}>{Tratamiento.observaciones}</Text>
          <Text style={styles.subtitulo2}>Insumos Utilizados</Text>
          <Text style={styles.subtitulo}>
            {elInsumo.length > 0 ? (
              <ScrollView>
                <View>
                  <View
                    style={{
                      marginHorizontal: 70,
                      backgroundColor: "white",
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#1D5E33",
                    }}
                  >
                    {elInsumo.map((insumos) => (
                      <View key={insumos.id} style={styles.itemContainer}>
                        <TouchableOpacity
                          style={styles.observaciones1}
                          onPress={() => {
                            navigation.navigate("InfoInsumo", { insumos });
                          }}
                        >
                          <Text style={styles.subtitulo}>{insumos.nombre}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.subtitulo}>No hay Insumos</Text>
              </View>
            )}
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.minicontainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                dispatch({ type: "deleteTratamientos", payload: Tratamiento });
                setModalMensaje("Tratamiento Eliminado");
                setShowModal(true);
              }}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate("TratamientoCurd", Tratamiento);
              }}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showModal && (
        <ModalMensaje
          mensaje={modalMensaje}
          closeModal={handleModalClose}
          navega={true}
        />
      )}
    </Layout>
  );
};

export default TratamientoInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Agrega espacio horizontal en los extremos del formulario
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center", // Ajusta el espacio entre el componente Layout y el formulario
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
  },
  subtitulo2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
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
    marginHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    paddingHorizontal: 5,
    marginVertical: 2,
  },
  minicontainer: {
    flexDirection: "row",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1D5E33",
  },
  itemText: {
    fontSize: 16,
  },
  observaciones1: {
    alignSelf: "center",
  },
});

import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TratContext from "../../provider/tratamientoProvider";
import ZonaContext from "../../provider/zonaProvider";

const VerMapa = () => {
  const navigation = useNavigation();
  const { state: TratamientosQueHay } = useContext(TratContext);
  const { state: Zonas, getZonaById } = useContext(ZonaContext);

  return (
    <Layout>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -32.522779,
            longitude: -55.765835,
            latitudeDelta: 5.0,
            longitudeDelta: 5.0,
          }}
        >
          {TratamientosQueHay.map((Tratamiento) => {
            const zona = getZonaById(Zonas, Tratamiento.zona);
            const coordenadas = zona
              ? {
                  latitude: parseFloat(zona.latitude),
                  longitude: parseFloat(zona.longitude),
                }
              : null;
            return (
              <Marker
                key={Tratamiento.id}
                coordinate={coordenadas}
                onPress={() =>
                  navigation.navigate("InfoTratamiento", { Tratamiento })
                }
              />
            );
          })}
        </MapView>
      </View>
    </Layout>
  );
};

export default VerMapa;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 100,
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
    height: 500,
    marginTop: 40,
    borderWidth: 5,
    borderColor: "black",
  },
});

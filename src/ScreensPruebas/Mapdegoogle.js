import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const Mapdegoogle = () => {
  const [origin, setorigin] = useState({
    latitude: -34.312977,
    longitude: -57.230646,
  });
  const [destination, setdestination] = useState({
    Latitud: -34.312977,
    Longitud: -57.230646,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          draggable={true}
          bcoordinate={origin}
          onDragEnd={(direction) => setorigin(direction.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
};

export default Mapdegoogle;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center", // Ajusta el espacio entre el componente Layout y el formulario
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

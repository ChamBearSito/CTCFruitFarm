// import React, { useState, useEffect } from "react";
// import { View, Text, Button, TextInput } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";

// export default function MapScreen() {
//   const [location, setLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   const handleMapPress = (event) => {
//     const { coordinate } = event.nativeEvent;
//     setSelectedLocation(coordinate);
//     setLatitude(coordinate.latitude.toString());
//     setLongitude(coordinate.longitude.toString());
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {location ? (
//         <MapView
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           onPress={handleMapPress}
//         >
//           {selectedLocation && <Marker coordinate={selectedLocation} />}
//         </MapView>
//       ) : (
//         <Text>Cargando mapa...</Text>
//       )}
//       <TextInput
//         value={latitude}
//         placeholder="Latitud"
//         onChangeText={(text) => setLatitude(text)}
//       />
//       <TextInput
//         value={longitude}
//         placeholder="Longitud"
//         onChangeText={(text) => setLongitude(text)}
//       />
//       <Button
//         title="Obtener Coordenadas"
//         onPress={() => {
//           console.log("Latitud:", latitude);
//           console.log("Longitud:", longitude);
//         }}
//       />
//     </View>
//   );
// }

import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const Mapdegoogle = () => {
  const [origin, setOrigin] = useState({
    latitude: -34.312977,
    longitude: -57.230646,
  });

  const handleMarkerDragEnd = (event) => {
    const { coordinate } = event.nativeEvent;
    setOrigin(coordinate);
    console.log("Latitud:", coordinate.latitude);
    console.log("Longitud:", coordinate.longitude);
  };

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
        <Marker draggable coordinate={origin} onDragEnd={handleMarkerDragEnd} />
      </MapView>
    </View>
  );
};

export default Mapdegoogle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

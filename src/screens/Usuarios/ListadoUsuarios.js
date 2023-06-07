import React, { useState, useContext, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BarraInferior from "../../components/BarraInferior";
import BarraSuperior from "../../components/BarraSuperior";
import { useNavigation } from "@react-navigation/native";
import { SwipeRow } from "react-native-swipe-list-view";
import { FontAwesome5 } from "@expo/vector-icons";
import UserContext from "../../provider/userProvider";
import ModalMensaje from "../../components/ModalMensaje";

const ListadoUsuarios = () => {
  const navigation = useNavigation();

  const handleUserPress = (usuario) => {
    navigation.navigate("InfoUser", { usuario });
  };

  // Array de usuarios del contexto
  const { state, dispatch } = useContext(UserContext);

  // Función para renderizar cada item de la lista
  const renderUsuariosItem = ({ item }) => (
    <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
      <View style={styles.standaloneRowBack}>
        <TouchableOpacity
          style={styles.botonesr}
          onPress={() => {
            dispatch({ type: "deleteUser", payload: item });
            setModalMensaje("Usuario Eliminado");
            setShowModal(true);
          }}
        >
          <Text style={{ color: "white" }}>Borrar</Text>
          <FontAwesome5 name="trash" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonesa}
          onPress={() => {
            navigation.navigate("AltaUsuario", item);
          }}
        >
          <Text style={{ color: "white" }}>Editar</Text>
          <FontAwesome5 name="edit" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.standaloneRowFront}>
        <TouchableOpacity onPress={() => handleUserPress(item)}>
          <View style={styles.itemContainer}>
            <AntDesign name="user" size={60} color="#1D5E33" />
            <Text style={styles.itemSubtitle}>
              {item.id} {item.nombre}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SwipeRow>
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
        source={require("../../assets/FondodePantalla.png")}
      /> */}
      <BarraSuperior />

      <View style={styles.container}>
        <Text style={styles.titulo}>Usuarios</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.scrollViewContent}>
        <FlatList
          style={styles.FlatList}
          data={state}
          renderItem={renderUsuariosItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />
        <View style={styles.line} />
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
    marginHorizontal: 80,
  },
  itemSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D5E33",
    marginLeft: 20,
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

// import React, { useState } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   Button,
//   SafeAreaView,
// } from "react-native";
// import { TextInput } from "react-native-gesture-handler";
// import { AntDesign } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import BarraInferior from "../components/BarraInferior";
// import BarraSuperior from "../components/BarraSuperior";
// import { useNavigation } from "@react-navigation/native";
// import { SwipeRow } from "react-native-swipe-list-view";
// import { FontAwesome5 } from "@expo/vector-icons";
// const PruebaLados = () => {
//   const navigation = useNavigation();

//   const handleUserPress = (usuario) => {
//     navigation.navigate("InfoUser", { usuario });
//   };

//   // Array de tratamientos de ejemplo
//   const [Usuarios, setUsuarios] = useState([
//     {
//       id: 1,
//       nombre: "JUANITO",
//       apellido: "Suarez",
//       cedula: 455454,
//       numero: "#0001",
//     },
//     {
//       id: 2,
//       nombre: "JUANITO",
//       apellido: "JIJIJA",
//       cedula: 4564664,
//       numero: "#0002",
//     },
//     {
//       id: 3,
//       nombre: "Marceliño",
//       apellido: "Albariño",
//       cedula: 584864,
//       numero: "#0003",
//     },
//     {
//       id: 4,
//       nombre: "MARCELA",
//       apellido: "Cavani",
//       cedula: 8476354,
//       numero: "#0004",
//     },
//     {
//       id: 5,
//       nombre: "OSVALDO",
//       apellido: "Chambonardo",
//       cedula: 4564664,
//       numero: "#0005",
//     },
//     {
//       id: 6,
//       nombre: "YESSICA",
//       apellido: "Mimosha",
//       cedula: 456797,
//       numero: "#0006",
//     },
//   ]);

//   // Función para renderizar cada item de la lista
//   const renderUsuariosItem = ({ item }) => (
//     <View style={{ flex: 1 }}>
//       <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
//         <View style={styles.standaloneRowBack}>
//           <TouchableOpacity style={styles.botones}>
//             <View style={styles.botonrojo}>
//               <Text>Borrar</Text>
//               <FontAwesome5 name="trash" size={24} color="black" />
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.botones}>
//             <View style={styles.botonorange}>
//               <Text style={{ paddingRight: 3 }}>Editar</Text>
//               <FontAwesome5 name="edit" size={24} color="black" />
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.standaloneRowFront}>
//           <TouchableOpacity onPress={() => handleUserPress(item)}>
//             <View style={styles.itemContainer}>
//               <AntDesign name="user" size={60} color="#1D5E33" />
//               <Text style={styles.itemSubtitle}>
//                 {item.numero} {item.nombre}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </SwipeRow>
//       {/* <View style={styles.spacer} /> */}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeAreaView}>
//       {/* <Image
//         style={styles.imageBackground}
//         source={require("../../assets/FondodePantalla.png")}
//       /> */}
//       <BarraSuperior />

//       <View style={styles.container}>
//         <Text style={styles.titulo}>Usuarios</Text>
//       </View>
//       <View style={styles.line} />

//       <View style={styles.scrollViewContent}>
//         <FlatList
//           style={styles.FlatList}
//           data={Usuarios}
//           renderItem={renderUsuariosItem}
//           keyExtractor={(item) => item.id.toString()}
//           ItemSeparatorComponent={() => <View style={styles.line} />}
//         />
//         <View style={styles.line} />
//       </View>

//       <BarraInferior />
//     </SafeAreaView>
//   );
// };

// export default PruebaLados;

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 10,
//     marginTop: 150,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   titulo: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#1D5E33",
//   },
//   line: {
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//     marginVertical: 5,
//   },
//   itemContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 5,
//     marginHorizontal: 80,
//   },
//   itemSubtitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1D5E33",
//     marginLeft: 20,
//   },
//   safeAreaView: {
//     flex: 1,
//     backgroundColor: "#cedda9",
//   },
//   scrollViewContent: {
//     flex: 1,
//   },
//   FlatList: {
//     flex: 1,
//   },

//   standaloneRowBack: {
//     alignItems: "center",

//     flexDirection: "row",
//     justifyContent: "space-between",
//     // backgroundColor: "black",
//     height: 100,
//   },

//   standaloneRowFront: {
//     alignItems: "center",
//     backgroundColor: "#cedda9",
//     justifyContent: "center",
//   },
//   botones: {
//     borderRadius: 10,
//     marginHorizontal: 1,
//     paddingLeft: 2,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   botonrojo: {
//     paddingVertical: 10,
//     borderRadius: 10,
//     flexDirection: "row",
//     backgroundColor: "red",
//     paddingHorizontal: 5,
//   },
//   botonorange: {
//     paddingVertical: 10,
//     borderRadius: 10,
//     flexDirection: "row",
//     backgroundColor: "orange",
//     paddingHorizontal: 2,
//   },
// });

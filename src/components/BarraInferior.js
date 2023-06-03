import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert, Modal, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const BarraInferior = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [subOption, setSubOption] = useState(null);

  const handlePress = () => {
    navigation.navigate("Home");
  };

  const handleMenuPress = () => {
    setModalVisible(true);
    setSelectedOption(null);
    setSubOption(null);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setSubOption(null);
  };

  const handleSubOptionPress = (option) => {
    setSubOption(option);
  };

  const handleBackPress = () => {
    if (subOption !== null) {
      setSubOption(null);
    } else {
      setSelectedOption(null);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
    setSelectedOption(null);
    setSubOption(null);
  };

  const renderMenuOptions = () => {
    if (subOption !== null) {
      return <></>;
    } else if (selectedOption !== null) {
      if (selectedOption === "Option 1") {
        return (
          <>
            <Pressable style={styles.optionButton} onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("AltaUsuario");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="user-plus"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Alta Usuarios</Text>
            </Pressable>
            {/* <Pressable
              style={styles.optionButton}
              onPress={() => handleSubOptionPress("Suboption 1.2")}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="user-minus"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Baja Usuarios</Text>
            </Pressable> */}
            {/* <Pressable
              style={styles.optionButton}
              onPress={() => handleSubOptionPress("Suboption 1.2")}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="user-edit"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Editar Usuarios</Text>
            </Pressable> */}
            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("ListadoUsuarios");
                hideModal();
              }}
            >
              <AntDesign
                style={styles.iconocentrado}
                name="solution1"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Lista Usuarios</Text>
            </Pressable>
          </>
        );
      } else if (selectedOption === "Option 2") {
        return (
          <>
            <Pressable style={styles.optionButton} onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("AltaZona");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="plus"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Alta Zona</Text>
            </Pressable>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("ListadoZonas");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="list"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Lista de Zonas</Text>
            </Pressable>
          </>
        );
      } else if (selectedOption === "Option 3") {
        return (
          <>
            <Pressable style={styles.optionButton} onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("AltaObservacion");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="plus"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Alta Observación</Text>
            </Pressable>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("ListadoObs");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="list"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Lista de Observaciónes</Text>
            </Pressable>
          </>
        );
      } else if (selectedOption === "Option 4") {
        return (
          <>
            <Pressable style={styles.optionButton} onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("AltaInsumos");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="plus"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Alta Insumo</Text>
            </Pressable>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("ListadoInsumos");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="list"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Lista de Insumos</Text>
            </Pressable>
          </>
        );
      } else if (selectedOption === "Option 5") {
        return (
          <>
            <Pressable style={styles.optionButton} onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("TratamientoCurd");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="plus"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Alta Tratamiento</Text>
            </Pressable>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                navigation.navigate("Listado");
                hideModal();
              }}
            >
              <FontAwesome5
                style={styles.iconocentrado}
                name="list"
                size={24}
                color="#1D5E33"
              />
              <Text style={styles.optionText}>Lista Tratamientos</Text>
            </Pressable>
          </>
        );
      }
    } else {
      return (
        <>
          <Pressable
            style={styles.optionButton}
            onPress={() => {
              navigation.navigate("Info");
              hideModal();
            }}
          >
            <AntDesign name="infocirlce" size={24} color="#1D5E33" />
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => handleOptionPress("Option 2")}
          >
            <FontAwesome
              style={styles.iconocentrado}
              name="map-o"
              size={24}
              color="#1D5E33"
            />
            <Text style={styles.optionText}>Zona</Text>
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => handleOptionPress("Option 1")}
          >
            <AntDesign
              style={styles.iconocentrado}
              name="user"
              size={24}
              color="#1D5E33"
            />
            <Text style={styles.optionText}>Usuarios</Text>
          </Pressable>

          <Pressable
            style={styles.optionButton}
            onPress={() => handleOptionPress("Option 4")}
          >
            <FontAwesome
              style={styles.iconocentrado}
              name="briefcase"
              size={24}
              color="#1D5E33"
            />
            <Text style={styles.optionText}>Insumos</Text>
          </Pressable>

          <Pressable
            style={styles.optionButton}
            onPress={() => handleOptionPress("Option 5")}
          >
            <FontAwesome
              style={styles.iconocentrado}
              name="medkit"
              size={24}
              color="#1D5E33"
            />
            <Text style={styles.optionText}>Tratamientos</Text>
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => handleOptionPress("Option 3")}
          >
            <AntDesign
              style={styles.iconocentrado}
              name="search1"
              size={24}
              color="#1D5E33"
            />
            <Text style={styles.optionText}>Observaciones</Text>
          </Pressable>
        </>
      );
    }
  };

  return (
    <View style={styles.FooterContainer}>
      <View style={styles.FooterView}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.iconContainer}>
            <Entypo name="home" size={80} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMenuPress}>
          <View style={styles.iconContainer}>
            <Ionicons name="menu" size={80} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderMenuOptions()}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={hideModal}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BarraInferior;

const styles = StyleSheet.create({
  FooterContainer: {
    backgroundColor: "#1D5E33",
    borderTopWidth: 2,
    borderTopColor: "white",
  },
  FooterView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  iconContainer: {
    marginHorizontal: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#1D5E33",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: "#000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  optionButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  optionText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  iconocentrado: {
    alignSelf: "center",
  },
});

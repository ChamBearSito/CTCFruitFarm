import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
import HomeScreen from "../screens/HomeScreen";
import InsumoCrud from "../screens/Insumos/InsumoCrud";
import ZoneCrud from "../screens/Zonas/ZoneCrud";
import ObservationCrud from "../screens/Observaciones/ObservationCrud";
import UserCrud from "../screens/Usuarios/UserCrud";
import ListTreataments from "../screens/Tratamientos/ListTreatments";
import InformationSreen from "../screens/InformationSreen";
import ListadoUsuarios from "../screens/Usuarios/ListadoUsuarios";
import UserInfo from "../screens/Usuarios/UserInfo";
import TratamientoInfo from "../screens/Tratamientos/TramientoInfo";
import ListaZonas from "../screens/Zonas/ListaZonas";
import InfoZona from "../screens/Zonas/InfoZona";
import InfoObservacion from "../screens/Observaciones/InfoObservacion";
import ListaObservaciones from "../screens/Observaciones/ListaObservaciones";
import ListaInsumos from "../screens/Insumos/ListaInsumos";
import InsumoInfo from "../screens/Insumos/InfoInsumos";
import TratamientoCrud from "../screens/Tratamientos/TreatmentCrud";
import VerMapa from "../screens/Mapa/VerMapa";

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* //! ----------------------------------  HOME  -------------------------------------------------------- */}
        {/* //! HOME// */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! ----------------------------------  SCREEN DE INFORMACION ---------------------------------------- */}

        {/* //! Info */}
        <Stack.Screen
          name="Info"
          component={InformationSreen}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! ----------------------------------  ALTAS SCREENS ------------------------------------------------- */}

        {/* //! Insumos */}
        <Stack.Screen
          name="AltaInsumos"
          component={InsumoCrud}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Usuario */}
        <Stack.Screen
          name="AltaUsuario"
          component={UserCrud}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Observaciones */}
        <Stack.Screen
          name="AltaObservacion"
          component={ObservationCrud}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Zona */}
        <Stack.Screen
          name="AltaZona"
          component={ZoneCrud}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Tratamiento */}
        <Stack.Screen
          name="TratamientoCurd"
          component={TratamientoCrud}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! ----------------------------------  LISTADO SCREENS------------------------------------------------ */}

        {/* //! Listado Tratamientos */}
        <Stack.Screen
          name="Listado"
          component={ListTreataments}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Listado Usuarios */}
        <Stack.Screen
          name="ListadoUsuarios"
          component={ListadoUsuarios}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Listado Zonas */}
        <Stack.Screen
          name="ListadoZonas"
          component={ListaZonas}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Listado OBS */}
        <Stack.Screen
          name="ListadoObs"
          component={ListaObservaciones}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Listado Insumos */}
        <Stack.Screen
          name="ListadoInsumos"
          component={ListaInsumos}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! ----------------------------------  INFO SCREENS-------------------------------------------------- */}

        {/* //! User Info */}
        <Stack.Screen
          name="InfoUser"
          component={UserInfo}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Zona Info */}
        <Stack.Screen
          name="InfoZona"
          component={InfoZona}
          options={{ headerShown: false }}
        ></Stack.Screen>
        {/* //! Observacion Info */}
        <Stack.Screen
          name="ObsInfo"
          component={InfoObservacion}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Tratamiento Info */}
        <Stack.Screen
          name="InfoTratamiento"
          component={TratamientoInfo}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Insumo  Info */}
        <Stack.Screen
          name="InfoInsumo"
          component={InsumoInfo}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! ---------------------------------- MAPA-------------------------------------------------- */}

        {/* //! MAPA*/}
        <Stack.Screen
          name="Mapa"
          component={VerMapa}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

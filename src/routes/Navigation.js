import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../ScreensPruebas/MapScreen";
import MapaFunca from "../ScreensPruebas/Mapafunca";
import InsumoCrud from "../screens/InsumoCrud";
import ZoneCrud from "../screens/ZoneCrud";
import ObservationCrud from "../screens/ObservationCrud";
import UserCrud from "../screens/Usuarios/UserCrud";

import ListTreataments from "../screens/Tratamientos/ListTreatments";
import InformationSreen from "../screens/InformationSreen";

import ListadoUsuarios from "../screens/Usuarios/ListadoUsuarios";

import UserInfo from "../screens/Usuarios/UserInfo";

import TratamientoInfo from "../screens/Tratamientos/TramientoInfo";
import PruebaLados from "../ScreensPruebas/PruebaLados";

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* //! Prueba// */}
        <Stack.Screen
          name="PruebaLados"
          component={PruebaLados}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! HOME// */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
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
          name="Tratamientos"
          component={ListTreataments}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Info */}
        <Stack.Screen
          name="Info"
          component={InformationSreen}
          options={{ headerShown: false }}
        ></Stack.Screen>

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

        {/* //! User Info */}
        <Stack.Screen
          name="InfoUser"
          component={UserInfo}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Tratamiento Info */}
        <Stack.Screen
          name="InfoTratamiento"
          component={TratamientoInfo}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

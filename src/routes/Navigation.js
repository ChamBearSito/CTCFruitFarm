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
import UserCrud from "../screens/UserCrud";
import PruebaListado from "../ScreensPruebas/PruebaListado";
import ListTreataments from "../screens/ListTreatments";
import InformationSreen from "../screens/InformationSreen";
export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        {/* //! Listado */}
        <Stack.Screen
          name="Listado"
          component={ListTreataments}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* //! Info */}
        <Stack.Screen
          name="Info"
          component={InformationSreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

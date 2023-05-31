import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

import HomeScreen from "../screens/HomeScreen";
import PruebaHome from "../ScreensPruebas/PruebaHome";
import PruebaInfo from "../ScreensPruebas/PruebaInfo";
import PruebaCrudUsuario from "../ScreensPruebas/PruebaCrudUsuario";
import PruebaZona from "../ScreensPruebas/PruebaZona";
import MapScreen from "../ScreensPruebas/MapScreen";
import Mapdegoogle from "../ScreensPruebas/Mapdegoogle";
import MapaFunca from "../ScreensPruebas/Mapafunca";
export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MapaFunca}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

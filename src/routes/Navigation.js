import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

import HomeScreen from "../screens/HomeScreen";
import PruebaHome from "../ScreensPruebas/PruebaHome";
export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PruebaHome}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

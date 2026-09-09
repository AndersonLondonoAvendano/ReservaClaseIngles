import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import DetalleClaseScreen from "../screen/DetalleClaseScreen";

const STACK = createNativeStackNavigator();

export default function ClasesStack() {
  return (
    <STACK.Navigator>
      <STACK.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <STACK.Screen
        name="DetalleClase"
        component={DetalleClaseScreen}
        options={{
          title: "Detalle",
          headerBackTitle: "Atrás",
        }}
      />
    </STACK.Navigator>
  );
}

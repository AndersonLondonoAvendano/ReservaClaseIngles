import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ClasesStack from "./src/navigation/ClasesStack";
import { ReservasProvider } from "./src/context/ReservasContext";
import { colors } from "./src/theme";

export default function App() {
  const temaNavegacion = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.fondo,
      card: colors.superficie,
      primary: colors.primario,
      text: colors.texto,
      border: colors.borde,
    },
  };
  return (
    <SafeAreaProvider>
      <ReservasProvider>
        <NavigationContainer theme={temaNavegacion}>
          <ClasesStack />
        </NavigationContainer>
        <StatusBar style="dark" />
      </ReservasProvider>
    </SafeAreaProvider>
  );
}
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EtiquetaNivel from "../components/EtiquetaNivel";
import { colors, radius, spacing, typography } from "../theme";
import { NIVELES, CLASES, formatearPrecio } from "../data/clases";
import NivelChip from "../components/NivelChip";
import Card from "../components/Card";
import UseResponsive from "../hooks/useResponsive";
import EstadoVacio from "../components/EstadoVacio";
import useResponsive from "../hooks/useResponsive";

export default function HomeScreen({ navigation }) {
  const [nivel, setNivel] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const inset = useSafeAreaInsets();
  const { columnas, paddingHorizontal } = useResponsive();
  

  const resultados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLowerCase();
    return CLASES.filter(() => {
      (clase) => {
        const coincideNivel = nivel === "Todos" || clase.nivel === nivel;
        const coincideTexto =
          textoBusqueda ||
          textoBusqueda === "" ||
          clase.profesor.nombre.toLowerCase().includes(textoBusqueda) ||
          clase.titulo.toLowerCase().includes(textoBusqueda);

        return coincideNivel && coincideTexto;
      };
    });
  }, [nivel, busqueda]);

  return (
    <View style={[styles.pantalla, { paddingTop: inset.top + spacing.md }]}>
      <View>
        <Text style={styles.titulo}>Reserva de clases Ingles</Text>
        <View style={styles.buscador}>
          <Ionicons name="search" size={18} color={colors.texto} />
          <TextInput
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar..."
            style={styles.input}
          />

          {busqueda.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.texto}
              onPress={() => setBusqueda("")}
            />
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        {NIVELES.map((item) => (
          <NivelChip
            key={item}
            etiqueta={item}
            activo={nivel === item}
            onPress={() => setNivel(item)}
          />
        ))}
      </ScrollView>
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <Card
            clase={item}
            onPress={() => navigation.navigate("DetalleClase", { clase: item })}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal,
          flexGrow: 1,
        }}
        numColumns={columnas}
        ListEmptyComponent={
          <EstadoVacio
            icono="search-outline"
            titulo="No encontramos resultados"
            mensaje="Prueba con otra combinación de palabras para la busqueda"
            onAction={() => {
              setNivel("Todos");
              setBusqueda("");
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  buscador: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.texto,
    textAlign: "center",
  },
});

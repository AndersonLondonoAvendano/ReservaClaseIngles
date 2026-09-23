import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import EtiquetaNivel from "./EtiquetaNivel";
import { colors, radius, spacing, typography } from "../theme";
import { formatearPrecio } from "../data/clases";

export default function Card({ clase, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.contenedor, pressed && styles.presionado]}
    >
      <Image source={{ uri: clase.imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <EtiquetaNivel nivel={clase.nivel} />
        <Text style={styles.titulo} numberOfLines={2}>
          {clase.titulo}
        </Text>
        <Text style={styles.subtitulo} numberOfLines={1}>
          {clase.profesor.nombre}
        </Text>

        <View style={styles.pie}>
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
          <Text style={styles.duracion}>{clase.duracion} min</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    margin: spacing.sm,
    backgroundColor: colors.fondo,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borde,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  presionado: {
    opacity: 0.85,
  },
  imagen: {
    width: "100%",
    height: 140,
    backgroundColor: colors.superficie,
  },
  info: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  titulo: {
    ...typography.bold,
    fontSize: 16,
  },
  subtitulo: {
    ...typography.regular,
    fontSize: 13,
    opacity: 0.7,
  },
  pie: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
  },
  precio: {
    ...typography.bold,
    fontSize: 15,
  },
  duracion: {
    fontSize: 12,
    color: colors.texto,
    opacity: 0.6,
  },
});

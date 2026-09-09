import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import EtiquetaNivel from "./EtiquetaNivel";
import { colors, radius, spacing, typography } from "../theme";
import { formatearPrecio, CLASES } from "../data/clases";

export default function Card({ clase, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: clase.imagen }} />
      <View>
        <EtiquetaNivel nivel={clase.nivel} />
        <Text style={styles.titulo}>{clase.titulo}</Text>
        
        <Text style={styles.subtitulo}>{clase.nivel}</Text>
        <Text  style={styles.subtitulo }>{clase.profesor.nombre}</Text>
        <Text style={styles.precio }>{formatearPrecio(clase.precio)}</Text>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 16,
    color: colors.color
  },
  subtitulo: {
    fontSize: 14,
    color: colors.color
  },
  precio: {
    fontSize: 10,
    color: colors.color
  }



});

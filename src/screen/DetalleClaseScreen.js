import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { colors, spacing, typography, shadow, radius } from "../theme";
import { formatearPrecio } from "../data/clases";
import EtiquetaNivel from "../components/EtiquetaNivel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useReservas } from "../context/ReservasContext";

export default function DetalleClasesScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { clase } = route.params;
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const { agregarReserva, cuposDisponibles } = useReservas();

  const disponibles = cuposDisponibles(clase);
  const sinCupos = disponibles <= 0;

  const reservarClase = () => {
    if (!horarioSeleccionado) {
      Alert.alert(
        "Selecciona un horario",
        "Debes elegir un horario antes de reservar."
      );
      return;
    }
    if (sinCupos) {
      Alert.alert("Sin cupos", "Esta clase ya no tiene cupos disponibles.");
      return;
    }

    agregarReserva(clase.id, horarioSeleccionado);
    Alert.alert(
      "Clase reservada",
      `Reservaste "${clase.titulo}" con ${clase.profesor.nombre} el ${horarioSeleccionado}.`
    );
  };

  return (
    <View style={styles.pantalla}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <Image
          source={{ uri: clase.imagen }}
          resizeMode="cover"
          style={styles.portada}
        />

        <View style={styles.contenido}>
          <EtiquetaNivel nivel={clase.nivel} />
          <Text style={styles.titulo}>{clase.titulo}</Text>

          <View style={styles.datos}>
            <View style={styles.dato}>
              <Ionicons name="time-outline" size={20} color={colors.primario} />
              <Text style={styles.datoValor}>{clase.duracion} min</Text>
            </View>
            <View style={styles.dato}>
              <Ionicons name="people-outline" size={20} color={colors.primario} />
              <Text style={styles.datoValor}>
                {disponibles > 0 ? `${disponibles} cupos` : "Sin cupos"}
              </Text>
            </View>
          </View>

          <View style={styles.profesor}>
            <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
            <View>
              <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
              <Text style={styles.profesorPais}>{clase.profesor.pais}</Text>
            </View>
          </View>

          <Text style={styles.seccionTitulo}>Descripción</Text>
          <Text style={styles.descripcion}>{clase.descripcion}</Text>

          <Text style={styles.seccionTitulo}>Horarios disponibles</Text>
          <View style={styles.horarios}>
            {clase.horarios.map((horario) => {
              const activo = horarioSeleccionado === horario;
              return (
                <Pressable
                  key={horario}
                  onPress={() => setHorarioSeleccionado(horario)}
                  style={[styles.horarioChip, activo && styles.horarioChipActivo]}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color={activo ? "#fff" : colors.primario}
                  />
                  <Text
                    style={[styles.horarioTexto, activo && styles.horarioTextoActivo]}
                  >
                    {horario}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.barra, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View>
          <Text style={styles.precioEtiqueta}>Precio</Text>
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
        </View>
        <Pressable
          style={[styles.boton, sinCupos && styles.botonDeshabilitado]}
          onPress={reservarClase}
          disabled={sinCupos}
        >
          <Text style={styles.botonTexto}>
            {sinCupos ? "Sin cupos" : "Reservar clase"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: "100%", height: 220, backgroundColor: colors.primarioSuave },
  contenido: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  titulo: { ...typography.titulos, fontSize: 22 },
  datos: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: "center", gap: 2 },
  datoValor: { fontSize: 16, fontWeight: "800", color: colors.texto },
  profesor: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borde,
  },
  profesorNombre: { fontSize: 15, fontWeight: "700", color: colors.texto },
  profesorPais: { fontSize: 13, color: colors.textoSuave, marginTop: 2 },
  seccionTitulo: { ...typography.subtitle, fontSize: 16, marginTop: spacing.sm },
  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    lineHeight: 22,
  },
  horarios: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  horarioChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  horarioChipActivo: {
    backgroundColor: colors.primario,
    borderColor: colors.primario,
  },
  horarioTexto: { fontSize: 13, fontWeight: "600", color: colors.texto },
  horarioTextoActivo: { color: "#fff" },
  barra: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    ...shadow,
  },
  precioEtiqueta: { fontSize: 12, color: colors.textoSuave },
  precio: { fontSize: 18, fontWeight: "800", color: colors.primario },
  boton: {
    backgroundColor: colors.primario,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
  },
  botonDeshabilitado: {
    backgroundColor: colors.textoSuave,
  },
  botonTexto: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
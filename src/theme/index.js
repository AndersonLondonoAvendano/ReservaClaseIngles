import { Platform } from "react-native";

export const colors = {
  fondo: "#13e0ef",
  superficie: "#fff",
  texto: "#111827",
  border: "#bbecf0",
};

// Espaciado
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const radius = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  full: 999,
};

export const typography = {
  titulos: { fontSize: 26, fontWeight: "800", color: colors.texto },
};

export default { colors, spacing, typography, radius };

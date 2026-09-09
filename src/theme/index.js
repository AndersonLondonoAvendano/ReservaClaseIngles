import { Platform } from "react-native";

export const colors = {
  fondo: "#ffffff",
  superficie: "#f9fafb",
  texto: "#111827",
  border: "#bbecf0",
};

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
  regular: { fontSize: 14, fontWeight: "400", color: colors.texto },
  bold: { fontSize: 14, fontWeight: "700", color: colors.texto },
  subtitle: { fontSize: 18, fontWeight: "600", color: colors.texto },
};

export default { colors, spacing, typography, radius };
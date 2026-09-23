import { Platform } from "react-native";



export const colors = {
  fondo: "#ffffff",
  superficie: "#f9fafb",
  texto: "#111827",
  textoSuave: "#6b7280",
  borde: "#bbecf0",
  primario: "#2e3fff",
  primarioSuave: "#e8eaff",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
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
  cuerpo: { fontSize: 14, fontWeight: "400" },
};

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 4,
};

export default { colors, spacing, typography, radius, shadow };
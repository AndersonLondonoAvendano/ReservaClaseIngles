import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@reservas_ingles";
export const ReservasContext = createContext(null);

export function ReservasProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // crear funcion cargar
  // cargar las reservas que tengo  guardades en el almacenamiento local, sino tengo nada, entonces me quedo con el estado inicial que es un array vacio
  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const valor = await AsyncStorage.getItem(STORAGE_KEY);
        if (valor !== null) setReservas(JSON.parse(valor));
      } catch (error) {
        console.error("Error leyendo reservas:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, []);

  //guardar  cada vez que cambie el arreglo de reservas
  useEffect(() => {
    if (cargando) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reservas)).catch(
      (error) => {
        console.error("Error guardando reservas: ", error);
      },
    );
  }, [reservas, cargando]);

  const agregarReserva = useCallback((clase, horario) => {
    const nueva = {
      id: clase.id + "-" + horario,
      titulo: clase.titulo,
      nivel: clase.nivel,
      profesor: clase.profesor.nombre + " " + clase.profesor.apellido,
      precio: clase.precio,
      horario,
      creadoEn: new Date().toISOString(),
    };

    let resultados = { ok: true };
    setReservas((prev) => {
      if (prev.some((r) => r.id === nueva.id)) {
        resultados = { ok: false };
        return prev;
      }
      return [...prev, nueva];
    });
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem(STORAGE_KEY).then((valor) => {
  //     if (valor !== null) setReservas(JSON.parse(valor));
  //     setCargando(false);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!cargando) return;
  //   AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
  // }, [reservas, cargando]);

  // const cancelarReserva = (reservaId) => {
  //   setReservas((actuales) => actuales.filter((r) => r.id !== reservaId));
  // };

  // const reservasDeClase = (claseId) =>
  //   reservas.filter((r) => r.claseId === claseId);

  // const cuposDisponibles = (clase) =>
  //   clase.cupos - reservasDeClase(clase.id).length;

  // return (
  //   <ReservasContext.Provider
  //     value={{
  //       reservas,
  //       agregarReserva,
  //       cancelarReserva,
  //       reservasDeClase,
  //       cuposDisponibles,
  //     }}
  //   >
  //     {children}
  //   </ReservasContext.Provider>
  // );
}

// export function useReservas() {
//   const contexto = useContext(ReservasContext);
//   if (!contexto) {
//     throw new Error("useReservas debe usarse dentro de un ReservasProvider");
//   }
//   return contexto;
// }

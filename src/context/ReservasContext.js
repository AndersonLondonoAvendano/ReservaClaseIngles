import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@reservas_ingles";
export const ReservasContext = createContext(null);

export function ReservasProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [cargado, setCargado] = useState(false);



  // // cargar las reservas que tengo  guardades en el almacenamiento local, sino tengo nada, entonces me quedo con el estado inicial que es un array vacio
  // useEffect(() => {
  //   const cargarReservas = async () => {
  //     try {
  //       const valor = await AsyncStorage.getItem(STORAGE_KEY);
  //       if (valor) setReservas(JSON.parse(valor));

  //     } catch (error) {
  //       console.error("Error leyendo reservas:", error);
  //     } finally {
  //       setCargado(true);
  //     } 
  //     cargarReservas();

  // }}, []);


  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((valor) => {
      if (valor) setReservas(JSON.parse(valor));
      setCargado(true);
    });
  }, []);

  useEffect(() => {
    if (!cargado) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
  }, [reservas, cargado]);

  const agregarReserva = (claseId, horario) => {
    const nuevaReserva = {
      id: `reserva-${Date.now()}`,
      claseId,
      horario,
      fecha: new Date().toISOString(),
    };
    setReservas((actuales) => [...actuales, nuevaReserva]);
    return nuevaReserva;
  };

  const cancelarReserva = (reservaId) => {
    setReservas((actuales) => actuales.filter((r) => r.id !== reservaId));
  };

  const reservasDeClase = (claseId) =>
    reservas.filter((r) => r.claseId === claseId);

  const cuposDisponibles = (clase) =>
    clase.cupos - reservasDeClase(clase.id).length;

  return (
    <ReservasContext.Provider
      value={{
        reservas,
        agregarReserva,
        cancelarReserva,
        reservasDeClase,
        cuposDisponibles,
      }}
    >
      {children}
    </ReservasContext.Provider>
  );
}

export function useReservas() {
  const contexto = useContext(ReservasContext);
  if (!contexto) {
    throw new Error("useReservas debe usarse dentro de un ReservasProvider");
  }
  return contexto;
}

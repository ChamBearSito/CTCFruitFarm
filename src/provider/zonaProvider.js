import React, { useState, createContext, useReducer } from "react";

let Zonas = [
  {
    id: 1,
    lugar: "Estanicia",
    depto: "Colonia",
    trabajadores: 44,
    latitude: -34.312977,
    longitude: -57.230646,
  },
  {
    id: 2,
    lugar: "Estancia",
    depto: "Colonia",
    trabajadores: 23,
    latitude: 35.2123,
    longitude: 67.1213,
  },
  {
    id: 3,
    lugar: "Quinta",
    depto: "Mendoza",
    trabajadores: 435,
    latitude: -32.8895,
    longitude: -68.8458,
  },
];

//! Definimos las Acciones para el Reducer
const actions = {
  createZona(state, action) {
    const Zona = action.payload;
    Zona.id = generateNumericId();
    // guardar la zpma en la db
    //database.insertZona(zona);
    return [...state, Zona];
  },
  updateZona(state, action) {
    const ZonaUpdated = action.payload;
    // update del Insumo en la db
    const id = ZonaUpdated.id;
    console.log("----id----", id);
    //database.editInsumo(InsumoUpdated);
    return [
      ...state.map((Zona) => (Zona.id === ZonaUpdated.id ? ZonaUpdated : Zona)),
    ];
  },
  deleteZona(state, action) {
    const ZonaDelete = action.payload;
    // Borrar la Zona de la db
    //database.deleteZona(ZonaDelete.id);
    return [...state.filter((Zona) => Zona.id !== ZonaDelete.id)];
  },
};

const generateNumericId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Concatenamos los componentes de la fecha y hora en un solo string numérico
  const numericId = `${year}${month}${day}${hours}${minutes}${seconds}`;

  return numericId;
};
const getZonaById = (state, zonaId) => {
  return state.find((zona) => zona.id === zonaId);
};

//! Creamos contexto para el reducer
const ZonaContext = createContext();

export const ZonaProvider = (props) => {
  const reducer = (state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  };

  const [state, dispatch] = useReducer(reducer, Zonas);
  return (
    <ZonaContext.Provider value={{ state, dispatch, getZonaById }}>
      {props.children}
    </ZonaContext.Provider>
  );
};

export default ZonaContext;

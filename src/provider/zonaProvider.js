import React, { useState, createContext, useReducer } from "react";
import { dataZona } from "../data/datazona";

const getZonas = async () => {
  const zonas = await dataZona.getZona();
  return zonas;
};

getZonas().then((zonas) => {
  zonas.map((zona) => {
    Zonas.push(zona);
  });
});

let Zonas = [];

//! Definimos las Acciones para el Reducer
const actions = {
  createZona(state, action) {
    const zona = action.payload;
    // guardar la zpma en la db
    dataZona.insertZona(zona).then((insertedId) => {
      zona.id = insertedId;
    });
    return [...state, zona];
  },
  updateZona(state, action) {
    const ZonaUpdated = action.payload;
    // update del Insumo en la db
    const id = ZonaUpdated.id;
    console.log("----id----", id);
    dataZona.editZona(ZonaUpdated);
    return [
      ...state.map((Zona) => (Zona.id === ZonaUpdated.id ? ZonaUpdated : Zona)),
    ];
  },
  deleteZona(state, action) {
    const ZonaDelete = action.payload;
    // Borrar la Zona de la db
    dataZona.deleteZona(ZonaDelete.id);
    return [...state.filter((Zona) => Zona.id !== ZonaDelete.id)];
  },
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

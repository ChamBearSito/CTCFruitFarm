import React, { useState, createContext, useReducer } from "react";
import { dataObs } from "../data/dataobs";
const getObs = async () => {
  const Obs = await dataObs.getObs();
  return Obs;
};

getObs().then((obs) => {
  obs.map((observacion) => {
    Observaciones.push({
      id: observacion.id,
      titulo: observacion.titulo,
      zonaId: observacion.zonaId,
      img: observacion.img,
    });
  });
});

let Observaciones = [
  // {
  //   id: 1,
  //   titulo: "Plaga Detectada",
  //   img: "https://source.unsplash.com/featured/?nature",
  //   zonaId: 2,
  // },
  // {
  //   id: 2,
  //   titulo: "Falta de Riego",
  //   img: "https://source.unsplash.com/featured/?nature",
  //   zonaId: 2,
  // },
  // {
  //   id: 3,
  //   titulo: "Planta en mal Estado",
  //   img: "https://source.unsplash.com/featured/?nature",
  //   zonaId: 2,
  // },
];

//! Definimos las Acciones para el Reducer
const actions = {
  createObs(state, action) {
    const Obs = action.payload;
    dataObs.insertObs(Obs).then((insertedId) => {
      Obs.id = insertedId;
    });

    return [...state, Obs];
  },
  updateObs(state, action) {
    const ObsUpdated = action.payload;
    // update del Insumo en la db
    const id = ObsUpdated.id;
    console.log("### id ###", id);
    //database.editInsumo(InsumoUpdated);
    dataObs.editObs(ObsUpdated);
    return [
      ...state.map((Obs) => (Obs.id === ObsUpdated.id ? ObsUpdated : Obs)),
    ];
  },
  deleteObs(state, action) {
    const ObsDelete = action.payload;
    // Borrar el Insumo de la db
    dataObs.deleteObs(ObsDelete.id);
    return [...state.filter((Obd) => Obd.id !== ObsDelete.id)];
  },
};

//! Creamos contexto para el reducer
const ObsContext = createContext();
const getObsById = (state, obsId) => {
  return state.filter((obs) => obs.zonaId === obsId);
};

export const ObsProvider = (props) => {
  const reducer = (state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  };

  const [state, dispatch] = useReducer(reducer, Observaciones);

  return (
    <ObsContext.Provider value={{ state, dispatch, getObsById }}>
      {props.children}
    </ObsContext.Provider>
  );
};

export default ObsContext;

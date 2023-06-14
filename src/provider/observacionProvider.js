import React, { useState, createContext, useReducer } from "react";

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
    Obs.id = generateNumericId();
    // guardar el usuario en la db
    //database.insertUser(user);
    return [...state, Obs];
  },
  updateObs(state, action) {
    const ObsUpdated = action.payload;
    // update del Insumo en la db
    const id = ObsUpdated.id;
    console.log("### id ###", id);
    //database.editInsumo(InsumoUpdated);
    return [
      ...state.map((Obs) => (Obs.id === ObsUpdated.id ? ObsUpdated : Obs)),
    ];
  },
  deleteObs(state, action) {
    const ObsDelete = action.payload;
    // Borrar el Insumo de la db
    //database.deleteInsumo(InsumoDelete.id);
    return [...state.filter((Obd) => Obd.id !== ObsDelete.id)];
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

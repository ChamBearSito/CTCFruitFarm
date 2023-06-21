import React, { useState, createContext, useReducer } from "react";
import { dataObs } from "../data/dataobs";
//! Traemos los datos que hayan
const getObs = async () => {
  const Obs = await dataObs.getObs();
  return Obs;
};
//! y por cada dato que haya que lo pushee a el Array de Observaciones
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

let Observaciones = [];

//#region  //! Definimos las Acciones para el Reducer + el getId
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

const getObsById = (state, obsId) => {
  return [...state.filter((obs) => obs.zonaId === obsId)];
};

//#endregion
//! Creamos contexto para el reducer
const ObsContext = createContext();

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

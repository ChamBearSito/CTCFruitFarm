import React, { useState, createContext, useReducer } from "react";
import { dataInsumo } from "../data/datainsumo";

//! Traemos los datos que hayan
const getInsumo = async () => {
  const insumos = await dataInsumo.getInsumo();
  return insumos;
};

//! y por cada dato que haya que lo pushee a el Array de Insumos
getInsumo().then((insumos) => {
  insumos.map((insumo) => {
    Insumos.push({
      id: insumo.id,
      nombre: insumo.nombre,
      cantidad: insumo.cantidad,
    });
  });
});

let Insumos = [];

//#region  //! Definimos las Acciones para el Reducer y el getInsumoById

const actions = {
  createInsumo(state, action) {
    const Insumo = action.payload;
    dataInsumo.insertInsumo(Insumo).then((insertedId) => {
      Insumo.id = insertedId;
    });
    return [...state, Insumo];
  },
  updateInsumo(state, action) {
    const InsumoUpdated = action.payload;
    // update del Insumo en la db
    const id = InsumoUpdated.id;
    console.log("### id ###", id);
    dataInsumo.editInsumo(InsumoUpdated);
    return [
      ...state.map((Insumo) =>
        Insumo.id === InsumoUpdated.id ? InsumoUpdated : Insumo
      ),
    ];
  },
  deleteInsumo(state, action) {
    const InsumoDelete = action.payload;
    // Borrar el Insumo de la db
    dataInsumo.deleteInsumo(InsumoDelete);
    return [...state.filter((Insumo) => Insumo.id !== InsumoDelete.id)];
  },
};

const getInsumoById = (state, insumoIds) => {
  return state.filter((insumo) => insumoIds.includes(insumo.id));
};

//#endregion
//! Creamos contexto para el reducer
const InsumoContext = createContext();

export const InsumoProvider = (props) => {
  const reducer = (state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  };

  const [state, dispatch] = useReducer(reducer, Insumos);

  return (
    <InsumoContext.Provider value={{ state, dispatch, getInsumoById }}>
      {props.children}
    </InsumoContext.Provider>
  );
};

export default InsumoContext;

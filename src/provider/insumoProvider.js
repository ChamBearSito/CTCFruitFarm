import React, { useState, createContext, useReducer } from "react";
import { dataInsumo } from "../data/datainsumo";

// const getInsumos = async () => {
//   const users = await database.getUsers();
//   return users;
// };

const getInsumo = async () => {
  const insumos = await dataInsumo.getInsumo();
  return insumos;
};

getInsumo().then((insumos) => {
  insumos.map((insumo) => {
    Insumos.push({
      id: insumo.id,
      nombre: insumo.nombre,
      cantidad: insumo.cantidad,
    });
  });
});

//! Creamos juego de prueba

let Insumos = [
  // { id: 1, nombre: "Hipermicida", cantidad: 400 },
  // { id: 2, nombre: "Desinfectante Ultra", cantidad: 200 },
  // { id: 3, nombre: "Gel Antibacterial Plus", cantidad: 150 },
  // { id: 4, nombre: "Limpiador Poderoso", cantidad: 300 },
  // { id: 5, nombre: "Spray Desinfectante", cantidad: 250 },
];

//! Definimos las Acciones para el Reducer
const actions = {
  createInsumo(state, action) {
    const Insumo = action.payload;
    // Insumo.id = generateNumericId();
    // guardar el usuario en la db
    dataInsumo.insertInsumo(Insumo);
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

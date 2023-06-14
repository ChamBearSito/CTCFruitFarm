import React, { useState, createContext, useReducer } from "react";

// const getInsumos = async () => {
//   const users = await database.getUsers();
//   return users;
// };

//! Creamos juego de prueba

let Insumos = [
  { id: 1, nombre: "Hipermicida", cantidad: 400 },
  { id: 2, nombre: "Desinfectante Ultra", cantidad: 200 },
  { id: 3, nombre: "Gel Antibacterial Plus", cantidad: 150 },
  { id: 4, nombre: "Limpiador Poderoso", cantidad: 300 },
  { id: 5, nombre: "Spray Desinfectante", cantidad: 250 },
];

//! Definimos las Acciones para el Reducer
const actions = {
  createInsumo(state, action) {
    const Insumo = action.payload;
    Insumo.id = generateNumericId();
    // guardar el usuario en la db
    //database.insertUser(user);
    return [...state, Insumo];
  },
  updateInsumo(state, action) {
    const InsumoUpdated = action.payload;
    // update del Insumo en la db
    const id = InsumoUpdated.id;
    console.log("### id ###", id);
    //database.editInsumo(InsumoUpdated);
    return [
      ...state.map((Insumo) =>
        Insumo.id === InsumoUpdated.id ? InsumoUpdated : Insumo
      ),
    ];
  },
  deleteInsumo(state, action) {
    const InsumoDelete = action.payload;
    // Borrar el Insumo de la db
    //database.deleteInsumo(InsumoDelete.id);
    return [...state.filter((Insumo) => Insumo.id !== InsumoDelete.id)];
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
// const getInsumoById = (state, zonaId) => {
//   return state.find((zona) => zona.id === zonaId);
// };

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

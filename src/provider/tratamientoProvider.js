import React, { useState, createContext, useReducer } from "react";
let Tratamientos = [
  {
    id: 1,
    nombre: "JUANITO",
    zona: 1,
    usuario: 1,
    insumo: 1,
    fechainicial: "06/14/2023",
    fechafin: "06/16/2023",
    tiempo: 4,
    orden: "jijija",
  },
];

const actions = {
  createTratamiento(state, action) {
    const Tratamiento = action.payload;
    Tratamiento.id = generateNumericId();
    // guardar el usuario en la db
    //database.insertUser(user);
    return [...state, Tratamiento];
  },
  updateTratamiento(state, action) {
    const TratamientoUpdated = action.payload;
    // update del usuario en la db
    const id = TratamientoUpdated.id;
    console.log("### id ###", id);
    //database.editUser(userUpdated);
    return [
      ...state.map((Tra) =>
        Tra.id === TratamientoUpdated.id ? TratamientoUpdated : Tra
      ),
    ];
  },
  deleteTratamientos(state, action) {
    const TratamientoDelete = action.payload;
    // Borrar el usuario de la db
    //database.deleteUser(userDelete.id);
    return [...state.filter((trat) => trat.id !== TratamientoDelete.id)];
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

const TratContext = createContext();

export const TratamientoProvider = (props) => {
  const reducer = (state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  };

  const [state, dispatch] = useReducer(reducer, Tratamientos);
  console.log("Estado Tratamientos:", state);
  return (
    <TratContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TratContext.Provider>
  );
};

export default TratContext;

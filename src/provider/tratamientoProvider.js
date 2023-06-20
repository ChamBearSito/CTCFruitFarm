import React, { useState, createContext, useReducer } from "react";
import { dataTrat } from "../data/datatrat";

const getTrats = async () => {
  const Trats = await dataTrat.getTrat();
  return Trats;
};
getTrats().then((trat) => {
  trat.map((eltratamiento) => {
    Tratamientos.push({
      id: eltratamiento.id,
      nombre: eltratamiento.nombre,
      zona: eltratamiento.zona,
      usuario: eltratamiento.usuario,
      insumo: eltratamiento.insumo,
      fechainicial: eltratamiento.fechainicial,
      fechafin: eltratamiento.fechafin,
      tiempo: eltratamiento.tiempo,
      orden: eltratamiento.orden,
    });
  });
});

let Tratamientos = [
  // {
  //   id: 1,
  //   nombre: "JUANITO",
  //   zona: 3,
  //   usuario: 1,
  //   insumo: 2,
  //   fechainicial: "2023-06-24T19:50:48.623Z",
  //   fechafin: "2023-06-24T19:50:48.623Z",
  //   tiempo: 4,
  //   orden: "undefined",
  // },
];

const actions = {
  createTratamiento(state, action) {
    const Tratamiento = action.payload;
    // Tratamiento.id = generateNumericId();
    // guardar el usuario en la db
    dataTrat.insertTrat(Tratamiento).then((insertedId) => {
      Tratamiento.id = insertedId;
    });
    return [...state, Tratamiento];
  },
  updateTratamiento(state, action) {
    const TratamientoUpdated = action.payload;
    // update del usuario en la db
    const id = TratamientoUpdated.id;
    console.log("### id ###", id);
    //database.editUser(userUpdated);
    dataTrat.editTrat(TratamientoUpdated);
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
    dataTrat.deleteTrat(TratamientoDelete.id);
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
  return (
    <TratContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TratContext.Provider>
  );
};

export default TratContext;

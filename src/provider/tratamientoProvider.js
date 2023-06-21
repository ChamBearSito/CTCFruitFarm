import React, { useState, createContext, useReducer } from "react";
import { dataTrat } from "../data/datatrat";
//! Traemos los datos que hayan
const getTrats = async () => {
  const Trats = await dataTrat.getTrat();
  return Trats;
};
//! y por cada dato que haya que lo pushee a el Array de Tratamientos
getTrats().then((trat) => {
  trat.map((eltratamiento) => {
    Tratamientos.push({
      id: eltratamiento.id,
      nombre: eltratamiento.nombre,
      zona: eltratamiento.zona,
      usuario: eltratamiento.usuario,
      insumo: eltratamiento.insumo.split(",").map(Number),
      fechainicial: eltratamiento.fechainicial,
      fechafin: eltratamiento.fechafin,
      tiempo: eltratamiento.tiempo,
      orden: eltratamiento.orden,
    });
  });
});

let Tratamientos = [];
//#region  //! Definimos las Acciones para el Reducer
const actions = {
  createTratamiento(state, action) {
    const Tratamiento = action.payload;
    // Tratamiento.id = generateNumericId();
    // guardar el usuario en la db
    let elTrat = Tratamiento;
    elTrat.insumo = elTrat.insumo.toString();

    dataTrat.insertTrat(elTrat).then((insertedId) => {
      Tratamiento.id = insertedId;
    });
    return [...state, Tratamiento];
  },
  updateTratamiento(state, action) {
    const TratamientoUpdated = action.payload;
    // update del usuario en la db
    console.log("### id ###", TratamientoUpdated.id);

    let elTrat = TratamientoUpdated;
    elTrat.insumo = elTrat.insumo.toString();
    //database.editUser(userUpdated);
    dataTrat.editTrat(elTrat);
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
//#endregion

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

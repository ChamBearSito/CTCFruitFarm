import React, { useState, createContext, useReducer } from "react";
import { datauser } from "../data/datauser";
//! Traemos los datos que hayan
const getUsers = async () => {
  const users = await datauser.getUsers();
  return users;
};

let Users = [];

//! y por cada dato que haya que lo pushee a el Array de Users
getUsers().then((users) => {
  users.map((user) => {
    Users.push({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      cedula: user.cedula,
    });
  });
});

//#region  //! Definimos las Acciones para el Reducer + el getId
const actions = {
  createUser(state, action) {
    const user = action.payload;
    console.log("elEstado", state);
    // guardar el usuario en la db

    datauser.insertUser(user).then((insertedId) => {
      user.id = insertedId;
    });
    return [...state, user];
  },
  updateUser(state, action) {
    const userUpdated = action.payload;
    // update del usuario en la db
    const id = userUpdated.id;
    datauser.editUser(userUpdated);
    return [
      ...state.map((user) => (user.id === userUpdated.id ? userUpdated : user)),
    ];
  },
  deleteUser(state, action) {
    const userDelete = action.payload;
    // Borrar el usuario de la db
    datauser.deleteUser(userDelete.id);
    return [...state.filter((user) => user.id !== userDelete.id)];
  },
};

const getUserById = (state, UserId) => {
  return state.find(
    (usuario) => usuario.id === UserId || usuario.cedula == UserId
  );
};
//#endregion

const UserContext = createContext();

export const UserProvider = (props) => {
  const reducer = (state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  };

  const [state, dispatch] = useReducer(reducer, Users);

  return (
    <UserContext.Provider value={{ state, dispatch, getUserById }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

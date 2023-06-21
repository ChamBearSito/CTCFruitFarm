import React, { useState, createContext, useReducer } from "react";
import { datauser } from "../data/datauser";

const getUsers = async () => {
  const users = await datauser.getUsers();
  return users;
};

let Users = [
  // {
  //   id: 1,
  //   nombre: "JUANITO",
  //   apellido: "Suarez",
  //   cedula: 455454,
  // },
  // {
  //   id: 2,
  //   nombre: "JUANITO",
  //   apellido: "JIJIJA",
  //   cedula: 4564664,
  // },
  // {
  //   id: 3,
  //   nombre: "Marceliño",
  //   apellido: "Albariño",
  //   cedula: 584864,
  // },
  // {
  //   id: 4,
  //   nombre: "MARCELA",
  //   apellido: "Cavani",
  //   cedula: 8476354,
  // },
  // {
  //   id: 5,
  //   nombre: "OSVALDO",
  //   apellido: "Chambonardo",
  //   cedula: 4564664,
  // },
  // {
  //   id: 6,
  //   nombre: "YESSICA",
  //   apellido: "Mimosha",
  //   cedula: 456797,
  // },
];

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

const actions = {
  createUser(state, action) {
    const user = action.payload;
    console.log('elEstado',state)
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
  return state.find((usuario) => usuario.id === UserId || usuario.cedula==UserId);
};

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

import React, { useState, createContext, useReducer } from "react";

// const getUsers = async () => {
//   const users = await database.getUsers();
//   return users;
// };

let Users = [
  {
    id: 1,
    nombre: "JUANITO",
    apellido: "Suarez",
    cedula: 455454,
  },
  {
    id: 2,
    nombre: "JUANITO",
    apellido: "JIJIJA",
    cedula: 4564664,
  },
  {
    id: 3,
    nombre: "Marceliño",
    apellido: "Albariño",
    cedula: 584864,
  },
  {
    id: 4,
    nombre: "MARCELA",
    apellido: "Cavani",
    cedula: 8476354,
  },
  {
    id: 5,
    nombre: "OSVALDO",
    apellido: "Chambonardo",
    cedula: 4564664,
  },
  {
    id: 6,
    nombre: "YESSICA",
    apellido: "Mimosha",
    cedula: 456797,
  },
];

// getUsers().then((users) => {
//   users.map((user) => {
//     Users.push({
//       id: user.id,
//       nombre: user.name,
//       apellido: user.lastname,
//       cedula: user.ci,
//     });
//   });
// });

const actions = {
  createUser(state, action) {
    const user = action.payload;
    user.id = generateNumericId();
    // guardar el usuario en la db
    //database.insertUser(user);
    return [...state, user];
  },
  updateUser(state, action) {
    const userUpdated = action.payload;
    // update del usuario en la db
    const id = userUpdated.id;
    console.log("### id ###", id);
    //database.editUser(userUpdated);
    return [
      ...state.map((user) => (user.id === userUpdated.id ? userUpdated : user)),
    ];
  },
  deleteUser(state, action) {
    const userDelete = action.payload;
    // Borrar el usuario de la db
    //database.deleteUser(userDelete.id);
    return [...state.filter((user) => user.id !== userDelete.id)];
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
const getUserById = (state, UserId) => {
  return state.find((usuario) => usuario.id === UserId);
};

const UserContext = createContext();

export const UserProvider = (props) => {
  const reducer = (state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  };

  const [state, dispatch] = useReducer(reducer, Users);
  console.log("theState:", state);
  return (
    <UserContext.Provider value={{ state, dispatch, getUserById }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

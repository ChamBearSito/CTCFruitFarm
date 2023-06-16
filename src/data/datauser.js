import * as SQlite from "expo-sqlite";
import { dataFunction } from "./database.js";

let db = dataFunction.getConnection();

const insertUserSQL =
  "INSERT INTO users (nombre, apellido, cedula) VALUES (?,?,?)";
const updateUserSQL =
  "UPDATE users SET nombre = (?), apellido = (?), cedula = (?) WHERE id = (?)";
const deletetUserSQL = "DELETE FROM users WHERE id = (?)";

// Crud usuario
const getUsers = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get users", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get users", succes);
          resolve(succes);
        }
      );
    });
  });
};

const insertUser = async (user) => {
  const { nombre, apellido, cedula } = user;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertUserSQL,
        [nombre, apellido, cedula],
        (_, succes) => {
          console.log("succes insert user", succes);
          resolve(succes.insertId);
        },
        (_, error) => {
          console.log("error insert user", error);
          reject(error);
        }
      );
    });
  });
};

const editUser = (user) => {
  const { id, nombre, apellido, cedula } = user;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateUserSQL,
        [nombre, apellido, cedula, id],
        (_, succes) => {
          console.log("succes update user", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update user", error);
          reject(error);
        }
      );
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deletetUserSQL,
        [id],
        (_, succes) => {
          console.log("succes update user", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete user", error);
          reject(error);
        }
      );
    });
  });
};

export const datauser = {
  // crud
  getUsers,
  insertUser,
  editUser,
  deleteUser,
};

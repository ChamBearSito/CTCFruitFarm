import * as SQlite from "expo-sqlite";
import { dataFunction } from "./database.js";

let db = dataFunction.getConnection();

const insertInsumoSQL = "INSERT INTO insumos (nombre, cantidad) VALUES (?,?)";
const updateInsumoSQL =
  "UPDATE insumos SET nombre = (?), cantidad = (?), WHERE id = (?)";
const deletetInsumoSQL = "DELETE FROM insumos WHERE id = (?)";

// Crud usuario
const getInsumo = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumos",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get insumos", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get insumos", succes);
          resolve(succes);
        }
      );
    });
  });
};

const insertInsumo = async (insumo) => {
  const { nombre, cantidad } = insumo;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertInsumoSQL,
        [nombre, cantidad],
        (_, succes) => {
          console.log("succes insert insumo", succes);
          resolve(succes.insertId);
        },
        (_, error) => {
          console.log("error insert insumo", error);
          reject(error);
        }
      );
    });
  });
};

const editInsumo = (insumo) => {
  const { id, nombre, cantidad } = insumo;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateInsumoSQL,
        [nombre, cantidad, id],
        (_, succes) => {
          console.log("succes update insumo", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update insumo", error);
          reject(error);
        }
      );
    });
  });
};

const deleteInsumo = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deletetInsumoSQL,
        [id],
        (_, succes) => {
          console.log("succes delete insumo", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete insumo", error);
          reject(error);
        }
      );
    });
  });
};

export const dataInsumo = {
  // crud
  getInsumo,
  insertInsumo,
  editInsumo,
  deleteInsumo,
};

import * as SQlite from "expo-sqlite";
import { dataFunction } from "./database.js";

let db = dataFunction.getConnection();

const createZonaSQL = `
  CREATE TABLE IF NOT EXISTS zonas(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   lugar VARCHAR(12),
   trabajadores INTEGER,
   depto VARCHAR(50),
   latitude VARCHAR(50),
   longitude VARCHAR(50)
   );`;
const insertZonaSQL =
  "INSERT INTO zonas (lugar, trabajadores, depto, latitude, longitude) VALUES (?,?,?,?,?)";
const updateZonaSQL = `
  UPDATE zonas 
  SET lugar = (?),
  trabajadores = (?),
  depto = (?),
  latitude = (?),
  longitude = (?) 
  WHERE id = (?)`;
const deletetZonaSQL = "DELETE FROM zonas WHERE id = (?)";

// Crud usuario
const getZona = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createZonaSQL, 
        [], () => {
      tx.executeSql(
        "SELECT * FROM zonas",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get zonas", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get zonas", succes);
          resolve(succes);
        }
      );
    });
  });
})};

const insertZona = async (zona) => {
  const { lugar, trabajadores, depto, latitude, longitude } = zona;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertZonaSQL,
        [lugar, trabajadores, depto, latitude, longitude],
        (_, succes) => {
          console.log("succes insert zona", succes);
          resolve(succes.insertId);
        },
        (_, error) => {
          console.log("error insert zona", error);
          reject(error);
        }
      );
    });
  });
};

const editZona = (zona) => {
  const { id, lugar, trabajadores, depto, latitude, longitude } = zona;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateZonaSQL,
        [lugar, trabajadores, depto, latitude, longitude, id],
        (_, succes) => {
          console.log("succes update zona", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update zona", error);
          reject(error);
        }
      );
    });
  });
};

const deleteZona = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deletetZonaSQL,
        [id],
        (_, succes) => {
          console.log("succes delete zona", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete zona", error);
          reject(error);
        }
      );
    });
  });
};

export const dataZona = {
  // crud
  getZona,
  insertZona,
  editZona,
  deleteZona,
};

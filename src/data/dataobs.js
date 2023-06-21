import { dataFunction } from "./database.js";
let db = dataFunction.getConnection();
//#region //! Observaciones SQL
const createObsSQL = `
  CREATE TABLE IF NOT EXISTS obs(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   titulo VARCHAR(60),
   zonaId INTEGER REFERENCES zonas(id),
   img VARCHAR(100)
   );`;
const insertObsSQL = "INSERT INTO obs(titulo, zonaId, img) VALUES (?,?,?)";
const updateObsSQL = `
  UPDATE obs 
  SET titulo = (?),
  zonaId = (?),
  img = (?)
  WHERE id = (?)`;
const deletetObsSQL = "DELETE FROM obs WHERE id = (?)";
//#endregion

//#region //! Operaciones de Observaciones
const getObs = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(createObsSQL, [], () => {
        tx.executeSql(
          "SELECT * FROM obs",
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (_, error) => {
            console.log("error get obs", error);
            reject(error);
          },
          (_, succes) => {
            console.log("succes get obs", succes);
            resolve(succes);
          }
        );
      });
    });
  });
};

const insertObs = async (obs) => {
  const { titulo, zonaId, img } = obs;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertObsSQL,
        [titulo, zonaId, img],
        (_, succes) => {
          console.log("succes insert Obs", succes);
          resolve(succes.insertId);
        },
        (_, error) => {
          console.log("error insert Obs", error);
          reject(error);
        }
      );
    });
  });
};

const editObs = (obs) => {
  const { id, titulo, zonaId, img } = obs;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateObsSQL,
        [titulo, zonaId, img, id],
        (_, succes) => {
          console.log("succes update Obs", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update Obs", error);
          reject(error);
        }
      );
    });
  });
};

const deleteObs = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deletetObsSQL,
        [id],
        (_, succes) => {
          console.log("succes delete obs", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete obs", error);
          reject(error);
        }
      );
    });
  });
};
//#endregion

export const dataObs = {
  // crud
  getObs,
  insertObs,
  editObs,
  deleteObs,
};

import { dataFunction } from "./database.js";

let db = dataFunction.getConnection();

const insertObsSQL =
  "INSERT INTO observaciones (titulo, zonaId, img) VALUES (?,?,?)";
const updateObsSQL = `
  UPDATE observaciones 
  SET titulo = (?),
  zonaId = (?),
  img = (?)`;
const deletetObsSQL = "DELETE FROM observaciones WHERE id = (?)";

const getObs = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM observaciones",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get observaciones", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get observaciones", succes);
          resolve(succes);
        }
      );
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
  const { titulo, zonaId, img } = obs;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateObsSQL,
        [titulo, zonaId, img],
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

export const dataObs = {
  // crud
  getObs,
  insertObs,
  editObs,
  deleteObs,
};

import { dataFunction } from "./database.js";
let db = dataFunction.getConnection();
//#region //! tratamientos SQL
const createTratSQL = `
CREATE TABLE IF NOT EXISTS tratamientos(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nombre VARCHAR(60),
 zona INTEGER REFERENCES zonas(id),
 usuario INTEGER REFERENCES users(id),
 insumo VARCHAR(30),
 fechainicial VARCHAR(60),
 fechafin VARCHAR(60),
 tiempo INTEGER,
 orden VARCHAR(60)
 );`;
const insertTratSQL =
  "INSERT INTO tratamientos(nombre, zona, usuario,insumo,fechainicial,fechafin,tiempo,orden) VALUES (?,?,?,?,?,?,?,?)";
const updateTratSQL = `
  UPDATE tratamientos 
  SET nombre = (?),
  zona = (?),
  usuario = (?),
  insumo = (?),
  fechainicial = (?),
  fechafin = (?),
  tiempo = (?),
  orden = (?)
  WHERE id = (?)`;
const deletetTratSQL = "DELETE FROM tratamientos WHERE id = (?)";

//#endregion

//#region //! Operaciones de tratamientos
const getTrat = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(createTratSQL, [], () => {
        tx.executeSql(
          "SELECT * FROM tratamientos",
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (_, error) => {
            console.log("error get tratamientos", error);
            reject(error);
          },
          (_, succes) => {
            console.log("succes get tratamientos", succes);
            resolve(succes);
          }
        );
      });
    });
  });
};

const insertTrat = async (Trat) => {
  console.log("El trat:", Trat);
  const {
    nombre,
    zona,
    usuario,
    insumo,
    fechainicial,
    fechafin,
    tiempo,
    orden,
  } = Trat;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertTratSQL,
        [nombre, zona, usuario, insumo, fechainicial, fechafin, tiempo, orden],
        (_, succes) => {
          console.log("succes insert TRAT", succes);
          resolve(succes.insertId);
        },
        (_, error) => {
          console.log("error insert TRAT", error);
          reject(error);
        }
      );
    });
  });
};

const editTrat = (Trat) => {
  const {
    id,
    nombre,
    zona,
    usuario,
    insumo,
    fechainicial,
    fechafin,
    tiempo,
    orden,
  } = Trat;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateTratSQL,
        [
          nombre,
          zona,
          usuario,
          insumo,
          fechainicial,
          fechafin,
          tiempo,
          orden,
          id,
        ],
        (_, succes) => {
          console.log("succes update Trat", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update Trat", error);
          reject(error);
        }
      );
    });
  });
};

const deleteTrat = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deletetTratSQL,
        [id],
        (_, succes) => {
          console.log("succes delete Trat", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete Trat", error);
          reject(error);
        }
      );
    });
  });
};
//#endregion

export const dataTrat = {
  // crud
  getTrat,
  editTrat,
  insertTrat,
  deleteTrat,
};

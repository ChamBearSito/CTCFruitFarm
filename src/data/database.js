import * as SQlite from "expo-sqlite";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";

export const dataFunction = {
  getConnection: () => {
    let db = SQlite.openDatabase("database.db");
    return db;
  },
};

const createUserSQL = `
  CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), apellido VARCHAR(50), cedula VARCHAR(8));`;
const createInsumoSQL = `
  CREATE TABLE insumos(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(50),cantidad INTEGER);`;

// inicialiar la db
const setupDatabase = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createUserSQL,
        [],
        (_, error) => {
          console.log("error on setupDatabase", error);
          reject(error);
        },
        (_, succes) => {
          resolve(succes);
        }
      );
      tx.executeSql(
        createInsumoSQL,
        [],
        (_, error) => {
          console.log("error on createInsumoSQL", error);
          reject(error);
        },
        (_, succes) => {
          resolve(succes);
        }
      );
    });
  });
};

const dropDatabaseTable = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        [],
        (tx, res) => {
          if (res.rows.length) {
            txn.executeSql("DROP TABLE IF EXISTS users", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), apellido VARCHAR(50), cedula VARCHAR(8))",
              [],
              (_, succes) => {
                resolve(succes);
              },
              (_, error) => {
                console.log("error dropping users table", error);
                reject(error);
              }
            );
          }
        }
      );
    });
  });
};

// FUNCIONES PARA IMPORTAR Y EXPORTAR
const importDB = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
  });
  if (result.type === "success") {
    console.log("result", result);
    // metodo FileSystem. getInfo para saber si tengo la carpeta creada
    const directory = FileSystem.documentDirectory + "SQLite";
    const folderExist = (await FileSystem.getInfoAsync(directory)).exists;
    if (!folderExist) {
      // crear la carpeta
      await FileSystem.makeDirectoryAsync(directory);
    }
    // Definir un base64
    const base64 = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // escribir el archivo
    await FileSystem.writeAsStringAsync(directory + "/database.db", base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }
};

const exportDB = async () => {
  const directory = FileSystem.documentDirectory + "SQLite";
  const folderExist = (await FileSystem.getInfoAsync(directory)).exists;

  if (Platform.OS === "android" && folderExist) {
    const base64 = await FileSystem.readAsStringAsync(
      directory + "/database.db",
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );
    const result = await FileSystem.StorageAccessFramework.createFileAsync(
      directory,
      "database.db",
      "application/octet-stream"
    );
    if (!result) {
      console.log("Error en permisos");
      return;
    }

    await FileSystem.writeAsStringAsync(result.uri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // compartir el archivo
    await Sharing.shareAsync(result.uri, {
      mimeType: "application/octet-stream",
    });
  } else {
    await Sharing.shareAsync(directory + "/database.db");
  }
};

export const database = {
  //Inicializar DB
  setupDatabase,
  dropDatabaseTable,
  // importar y exportar
  importDB,
  exportDB,
};

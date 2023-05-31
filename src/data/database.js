import * as SQlite from "expo-sqlite";
const db = SQlite.openDatabase("database.db");
//import Users from "./users";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";

const createTableSQL =
  "CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), email VARCHAR(50), avatarUrl VARCHAR(400))";
const insertUserSQL =
  "INSERT INTO users (name, email, avatarUrl) VALUES (?,?,?)";
const updateUserSQL =
  "UPDATE users SET name = (?), email = (?), avatarUrl = (?) WHERE id = (?)";
const deletetUserSQL = "DELETE FROM users WHERE id = (?)";

// inicialiar la db
const setupDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        createTableSQL,
        [],
        (_, error) => {
          console.log("error on setupDatabase", error);
          reject(error);
        },
        (_, succes) => {
          resolve(succes);
        }
      );
    });
  });
};

const setupUsers = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (name, email, avatarUrl) VALUES (?, ?, ?)",
        ["sbarcelona", "sbarcelona@gmail.com", "https://avatar.com/avatar.jpg"],
        (tx, succes) => {
          resolve(succes);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

const dropDatabaseTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        [],
        (tx, res) => {
          if (res.rows.length) {
            txn.executeSql("DROP TABLE IF EXISTS users", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(40), avatarUrl VARCHAR(200))",
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
  const { name, email, avatar } = user;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertUserSQL,
        [name, email, avatar],
        (_, succes) => {
          console.log("succes insert user", succes);
          resolve(succes);
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
  const { id, name, email, avatar } = user;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateUserSQL,
        [name, email, avatar, id],
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

const openDatabase = async (pathToDatabaseFile) => {
  // if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
  //   await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  // }
  // await FileSystem.downloadAsync(
  //   Asset.fromModule(require(pathToDatabaseFile)).uri,
  //   FileSystem.documentDirectory + 'SQLite/database.db'
  // );
  // return SQlite.openDatabase('database.db');
};

export const database = {
  setupDatabase,
  setupUsers,
  deleteUser,
  dropDatabaseTable,
  // crud
  getUsers,
  insertUser,
  editUser,
  deleteUser,
  // importar y exportar
  importDB,
  exportDB,
};

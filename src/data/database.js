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
  // importar y exportar
  importDB,
  exportDB,
};

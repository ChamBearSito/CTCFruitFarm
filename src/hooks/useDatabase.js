import { useState, useEffect } from "react";
import { database } from "../data/database";

const useDatabase = () => {
  const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await database.getUsers();
        // llamar a la db para que se carguen los datos

        // borra la db
        // setup db
        // agrega un usuario

        // si ya tengo usuario
        // No quiero correr estas lineas
        if (users.length == 0) {
          await database.dropDatabaseTable();
          await database.setupDatabase();
          await database.setupUsers();
        }
        setIsDBLoadingComplete(true);
      } catch (err) {
        console.log("error on useDatabase Hook", err);
      }
    };

    loadData().then(() => console.log("loading data"));
  }, []);

  return isDBLoadingComplete;
};

export default useDatabase;

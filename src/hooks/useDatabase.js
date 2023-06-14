import { useState, useEffect } from "react";
import { database } from "../data/database";

const useDatabase = () => {
  const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);
  const [dbName, setDbName] = useState("database.db");
  const [db, setDb] = useState(null);

  useEffect(() => {
    const loadData = async () => {
        try {
          // llamar a una funcion que me haga la conexion a la db
          const openDb = database;
          console.log('### openDb ###', openDb)
          setDb(openDb)
          await openDb.setupDatabase();
          const users = openDb.getUsers();
          if(users.length == 0) {
            await openDb.dropDatabaseTable();
          }
          
          setIsDBLoadingComplete(true);
        } catch (err) {
          console.log("error on useDatabase Hook", err);
        }
      };

    loadData().then(() => console.log("loading data"));
  }, [dbName]);

  return {isDBLoadingComplete, db, setDbName};
};

export default useDatabase;

import { useState, useEffect } from "react";
import { database } from "../data/database";
import { dataFunction } from "../data/database";

const useDatabase = () => {
  const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // llamar a una funcion que me haga la conexion a la db
        const openDb = dataFunction.getConnection();

        await database.setupDatabase(openDb).then(()=>{
          setIsDBLoadingComplete(true);
        });
        // openDb.transaction((tx) => {
        //   tx.executeSql(
        //     "SELECT name FROM sqlite_master WHERE type='table';",
        //     [],
        //     (_, result) => {
        //       const tables = result.rows;
        //       for (let i = 0; i < tables.length; i++) {
        //         console.log("Tabla Creada:", tables.item(i).name);+
        //       }
        //     },
        //     (_, error) => {
        //       console.log("Error en la consulta SQL:", error);
        //     }
        //   );
        // });
      } catch (err) {
        console.log("error on useDatabase Hook", err);
      }
    };

    loadData().then(() => console.log("loading data"));
  }, []);

  return { isDBLoadingComplete };
};

export default useDatabase;

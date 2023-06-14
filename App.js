import { StatusBar } from "expo-status-bar";
import { RootStack } from "./src/routes/Navigation";
import { UserProvider } from "./src/provider/userProvider";
import { InsumoProvider } from "./src/provider/insumoProvider";
import { ZonaProvider } from "./src/provider/zonaProvider";
import { ObsProvider } from "./src/provider/observacionProvider";
import { TratamientoProvider } from "./src/provider/tratamientoProvider";

import useDatabase from './src/hooks/useDatabase';

export default function App() {
  const {isDBLoadingComplete,db} = useDatabase()
  console.log('isDBLoadingComplete', isDBLoadingComplete)
  return (
    <>
      <UserProvider>
        <InsumoProvider>
          <ZonaProvider>
            <ObsProvider>
              <TratamientoProvider>
                <StatusBar style="auto" />
                <RootStack />
              </TratamientoProvider>
            </ObsProvider>
          </ZonaProvider>
        </InsumoProvider>
      </UserProvider>
    </>
  );
}

import { StatusBar } from "expo-status-bar";
import { RootStack } from "./src/routes/Navigation";
import { UserProvider } from "./src/provider/userProvider";
import { InsumoProvider } from "./src/provider/insumoProvider";
import { ZonaProvider } from "./src/provider/zonaProvider";
import { ObsProvider } from "./src/provider/observacionProvider";
export default function App() {
  return (
    <>
      <UserProvider>
        <InsumoProvider>
          <ZonaProvider>
            <ObsProvider>
              <StatusBar style="auto" />
              <RootStack />
            </ObsProvider>
          </ZonaProvider>
        </InsumoProvider>
      </UserProvider>
    </>
  );
}

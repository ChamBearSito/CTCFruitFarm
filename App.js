import { StatusBar } from "expo-status-bar";
import { RootStack } from "./src/routes/Navigation";
import { UserProvider } from "./src/provider/userProvider";
import { InsumoProvider } from "./src/provider/insumoProvider";
import { ZonaProvider } from "./src/provider/zonaProvider";
export default function App() {
  return (
    <>
      <UserProvider>
        <InsumoProvider>
          <ZonaProvider>
            <StatusBar style="auto" />
            <RootStack />
          </ZonaProvider>
        </InsumoProvider>
      </UserProvider>
    </>
  );
}

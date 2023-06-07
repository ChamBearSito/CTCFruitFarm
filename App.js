import { StatusBar } from "expo-status-bar";
import { RootStack } from "./src/routes/Navigation";
import { UserProvider } from "./src/provider/userProvider";
import { InsumoProvider } from "./src/provider/insumoProvider";
export default function App() {
  return (
    <>
      <UserProvider>
        <InsumoProvider>
          <StatusBar style="auto" />
          <RootStack />
        </InsumoProvider>
      </UserProvider>
    </>
  );
}

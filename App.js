import { StatusBar } from "expo-status-bar";
import { RootStack } from "./src/routes/Navigation";
import { UserProvider } from "./src/provider/userProvider";
export default function App() {
  return (
    <>
      <UserProvider>
        <StatusBar style="auto" />
        <RootStack />
      </UserProvider>
    </>
  );
}

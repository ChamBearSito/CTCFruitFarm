import { StatusBar } from "expo-status-bar";
import { RootStack } from "./src/routes/Navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RootStack />
    </>
  );
}

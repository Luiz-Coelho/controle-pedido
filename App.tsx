import "react-native-get-random-values";
import "./polyfills";

import "./global.css";
import { StatusBar } from "react-native";
import AppNavigator from "./navigation";
import Toast from "react-native-toast-message";

import { useInitMigrations } from "./hooks/useInitMigrations";
import { LoadingScreen } from "./screens/LoadingScreen";

export default function App() {
  const { ready } = useInitMigrations();

  if (!ready) return <LoadingScreen />;

  return (
    <>
      <AppNavigator />
      <Toast />
      <StatusBar barStyle={"default"} />
    </>
  );
}

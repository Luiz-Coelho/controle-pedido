import "react-native-get-random-values";
import "./polyfills";
import "react-native-reanimated";

import "./global.css";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import AppNavigator from "./navigation";
import Toast from "react-native-toast-message";
import { useInitMigrations } from "./hooks/useInitMigrations";
import { LoadingScreen } from "./screens/LoadingScreen";
import { inputTheme } from "./styles/inputTheme";

export default function App() {
  const { ready } = useInitMigrations();

  if (!ready) return <LoadingScreen />;

  return (
    <PaperProvider theme={{ ...inputTheme }}>
      <AppNavigator />
      <Toast />
      <StatusBar barStyle={"default"} />
    </PaperProvider>
  );
}

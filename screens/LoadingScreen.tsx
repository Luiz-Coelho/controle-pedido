import { Text } from "react-native";
import { Screen } from "../components/Screen";
import { Loading } from "../components/Loading";

export function LoadingScreen() {
  return (
    <Screen>
      <Loading />
      <Text
        style={{
          marginTop: 16,
          color: "#999",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Inicializando app...
      </Text>
    </Screen>
  );
}

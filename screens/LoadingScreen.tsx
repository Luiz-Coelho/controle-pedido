import { View, ActivityIndicator, Text } from "react-native";

export function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={{ marginTop: 12, color: "#444" }}>Inicializando app...</Text>
    </View>
  );
}

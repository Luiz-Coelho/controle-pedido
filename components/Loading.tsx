import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { loadingStyles } from "../styles/loadingStyles";

export function Loading() {
  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

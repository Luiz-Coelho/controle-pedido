import { StyleSheet, Platform } from "react-native";
import { theme } from "./theme";

export const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical:
      Platform.OS === "ios" ? theme.spacing.lg : theme.spacing.md,
  },
});

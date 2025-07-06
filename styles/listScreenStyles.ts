import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const listScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: "600",
    textAlign: "center",
  },
});

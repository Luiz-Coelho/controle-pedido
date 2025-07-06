import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const deleteButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    marginLeft: theme.spacing.md,
  },
});

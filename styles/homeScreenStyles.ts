import { StyleSheet } from "react-native";
import { theme } from "./theme";

const buttonBase = {
  borderRadius: theme.radius.md,
  padding: theme.spacing.md,
  flexDirection: "row" as const,
  alignItems: "center" as const,
  gap: theme.spacing.sm,
  marginTop: theme.spacing.sm,
};

export const homeScreenStyles = StyleSheet.create({
  scroll: {
    padding: theme.spacing.lg,
    gap: theme.spacing.xl,
  },

  section: {
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
  },

  sectionLast: {
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.xl,
  },

  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing.md,
  },

  actions: {
    gap: theme.spacing.md,
  },

  buttonCyan: {
    ...buttonBase,
    backgroundColor: "#06b6d4", // cyan-500
  },

  buttonYellow: {
    ...buttonBase,
    backgroundColor: "#ca8a04", // yellow-600
  },

  buttonPurple: {
    ...buttonBase,
    backgroundColor: "#9333ea", // purple-600
  },

  buttonText: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 16,
    marginLeft: theme.spacing.sm,
  },
});

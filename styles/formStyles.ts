import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },

  scrollContainer: {
    flex: 1,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },

  buttonsContainer: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },

  input: {
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.lg,
  },

  maskInput: {
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },

  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },

  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.lg,
  },

  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.lg,
  },

  removeButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.lg,
  },

  buttonText: {
    color: theme.colors.textMuted,
    textAlign: "center",
    fontWeight: "600",
  },

  buttonTextSecondary: {
    color: theme.colors.text,
    textAlign: "center",
    fontWeight: "600",
  },

  segmented: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
  },

  indexText: {
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: theme.colors.overlay,
  },

  modalContent: {
    backgroundColor: theme.colors.modalBackground,
    borderRadius: 12,
    padding: 16,
  },
});

import { theme } from "./theme";

const cardBase = {
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.background,
  },
  name: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "600" as const,
  },
  detail: {
    color: theme.colors.text,
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    marginLeft: theme.spacing.sm,
    alignItems: "center" as const,
  },
};

export default cardBase;

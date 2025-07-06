import { StyleSheet } from "react-native";
import { theme } from "./theme";
import cardBase from "./cardBase";

const orderCardStyles = StyleSheet.create({
  container: {
    ...cardBase.container,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  infoArea: {
    flex: 4,
    gap: theme.spacing.xs,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.lg,
  },
  actionArea: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  name: {
    ...cardBase.name,
  },
  detail: {
    ...cardBase.detail,
  },
  deleteButton: {
    ...cardBase.deleteButton,
  },
});

export default orderCardStyles;

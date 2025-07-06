import { StyleSheet } from "react-native";
import { theme } from "./theme";
import cardBase from "./cardBase";

const orderItemCardStyles = StyleSheet.create({
  container: {
    ...cardBase.container,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  infoArea: {
    flex: 4,
    gap: theme.spacing.xs,
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

export default orderItemCardStyles;

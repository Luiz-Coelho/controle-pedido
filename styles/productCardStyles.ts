import { StyleSheet } from "react-native";
import { theme } from "./theme";
import cardBase from "./cardBase";

const productCardStyles = StyleSheet.create({
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
    flex: 4, // 80%
    gap: theme.spacing.xs,
  },
  actionArea: {
    flex: 1, // 20%
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

export default productCardStyles;

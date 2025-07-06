import { theme as appTheme } from "./theme";

export const inputTheme = {
  colors: {
    primary: appTheme.colors.primary,
    onSurfaceVariant: appTheme.colors.placeholder, // cor da label flutuante quando não focado
    onSurface: appTheme.colors.text, // cor do texto do input
  },
};

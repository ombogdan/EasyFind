import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    titleText: {
      fontFamily: "TT Hoves Pro Trial DemiBold",
      fontSize: scale(24),
      fontWeight: "600",
      color: theme.palette.dark
    },
    viewAllAlbums: {
      fontFamily: "SF-Pro-Display-Medium",
      fontSize: scale(16),
      fontWeight: "500",
      color: theme.palette.orange
    },
  })
);

import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.palette.secondary,
      flex: 1
    },
    container: {
      margin: scale(16)
    },
    logo: {
      fontFamily: "TT Hoves Pro Trial",
      fontSize: scale(44),
      fontWeight: "700",
      color: theme.palette.orange
    }
  })
);

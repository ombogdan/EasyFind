import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      width: '48.5%',
      height: scale(180),
      borderRadius: scale(16),
      borderWidth: scale(2),
      borderColor: theme.palette.dark,
      marginRight: scale(8),
      marginBottom: scale(35),
      position: "relative"
    },
    genreName: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
      marginTop: scale(8),
      color: theme.palette.dark,
    },
    albumIcon:{
      width: '100%',
      height: scale(176),
      borderRadius: scale(14),
    }
  })
);

import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      width: scale(160),
      height: scale(180),
      borderRadius: scale(16),
      borderWidth: scale(2),
      borderColor: theme.palette.dark,
      marginRight: scale(8),
      marginBottom: scale(60)
    },
    songName: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.dark,
      marginRight: scale(10)
    },
    artistName: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(10),
      fontWeight: "400",
      color: theme.palette.dark,
      marginRight: scale(10)
    },
    namesContainer:{
      marginTop: scale(8)
    },
    albumIcon: {
      width: scale(156),
      height: scale(176),
      borderRadius: scale(14),
    }
  })
);

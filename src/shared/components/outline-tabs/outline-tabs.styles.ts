import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
    },
    tabNameText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.dark
    },
    activeTabLine: {
      width: scale(114),
      height: scale(4),
      borderRadius: scale(2),
      backgroundColor: theme.palette.orange,
      marginTop: scale(13)
    },
    tabContainer:{
      width: scale(114),
      height: scale(44),
      alignItems: 'center',
      justifyContent: "space-between"
    }
  })
);

import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    headerContainer: {
      width: "100%",
      height: scale(56),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: scale(16),
      backgroundColor: theme.palette.secondaryWhite,
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondaryDisabled
    },
    logIn: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
    },
    signUp: {
      fontFamily: "TT Hoves Pro Trial",
      fontSize: scale(30),
      fontWeight: "600"
    },
    descBlack: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "400",
      textAlign: 'center',
    },
    descOrange: {
      color: theme.palette.orange
    },
    mainContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "92%"
    },
    backText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.orange,
      marginLeft: scale(8)
    }
  })
);

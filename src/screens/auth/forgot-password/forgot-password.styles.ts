import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    signUp: {
      fontFamily: "TT Hoves Pro Trial",
      fontSize: scale(32),
      fontWeight: "600",
      color: theme.palette.dark
    },
    descText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.grayPrimary
    },
    mainContainer:{
      flex: 1
    },
    enderCode: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      color: theme.palette.grayPrimary
    },
    enderCodeBold: {
      fontWeight: "500",
      color: theme.palette.dark
    },
    inputContainer: {
      borderWidth: scale(1),
      borderRadius: 30,
      width: scale(48),
      height: scale(48),
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.palette.grayPrimary
    },
    inputContainerOrange: {
      borderWidth: scale(2),
      borderRadius: 30,
      width: scale(48),
      height: scale(48),
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.palette.orange
    },
    code: {
      fontSize: scale(14),
      fontWeight: "bold"
    },
    resendCode: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(16),
      fontWeight: "500",
      marginRight: scale(8),
      color: theme.palette.orange,
    },
    resendCodeGray: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(16),
      color: theme.palette.grayLight,
      marginRight: scale(8)
    },
    timer: {
      marginLeft: scale(4),
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.orange
    },
    inputContainerRed: {
      borderWidth: scale(2),
      borderRadius: 30,
      width: scale(48),
      height: scale(48),
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.palette.danger
    },
    errorCodeMessage: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(12),
      fontWeight: "500",
      color: theme.palette.danger,
      marginTop: scale(10)
    }
  })
);

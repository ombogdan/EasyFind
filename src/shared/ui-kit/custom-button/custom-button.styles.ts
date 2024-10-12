import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ scale, theme, disabled, title }: any) =>
  StyleSheet.create({
    button: {
      borderRadius: scale(16),
      justifyContent: "center",
      alignItems: "center",
      height: scale(44),
      borderWidth: scale(2),
      borderColor: disabled ? theme.palette.secondaryDisabled : theme.palette.dark,
      width: "100%",
      zIndex: 1,
      bottom: scale(4),
      left: scale(2)
    },
    loader: {
      height: scale(60),
      width: scale(60)
    },
    btnText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(16),
      fontWeight: "500",
    },
    overloadContainer: {
      borderRadius: scale(16),
      justifyContent: "center",
      alignItems: "center",
      height: scale(44),
      backgroundColor: theme.palette.dark
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    iconLeft: {
      marginRight: !title ? 0 : scale(8),
      opacity: disabled ? 0.4 : 1
    },
    iconRight: {
      marginLeft: !title ? 0 : scale(8),
      opacity: disabled ? 0.4 : 1
    },
  })
);

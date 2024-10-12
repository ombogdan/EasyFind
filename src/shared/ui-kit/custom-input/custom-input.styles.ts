import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ error, scale, theme, leftIcon, rightIcon, search }: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      borderRadius: scale(15),
      width: "100%",
      paddingBottom: scale(12),
      height: !error ? scale(72) : scale(82),
    },
    input: {
      width: "100%",
      height: scale(44),
      paddingTop: scale(8),
      paddingRight: rightIcon ? scale(36) : scale(12),
      paddingBottom: scale(8),
      paddingLeft: leftIcon ? scale(35) : scale(12),
      borderRadius: search ? scale(16) : scale(24),
      borderWidth: scale(2),
      backgroundColor:  error ? theme.palette.white : theme.palette.secondary,
      borderColor: error ? theme.palette.danger : theme.palette.primaryGray
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    label: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: scale(5)
    },
    labelText: {
      color: theme.palette.dark
    },
    errorMessage: {
      color: theme.palette.danger,
      marginTop: scale(4)
    },
    leftIcon: {
      width: scale(24),
      height: scale(24),
      position: "absolute",
      top: scale(10),
      left: scale(7),
      zIndex: 100
    },
    rightIcon: {
      width: scale(24),
      height: scale(24),
      position: "absolute",
      top: -scale(12),
      right: scale(7),
    }
  })
);

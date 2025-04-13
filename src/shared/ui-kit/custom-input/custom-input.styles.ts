import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";
import { hexToRGBA } from "utils/hexToRgba";

export const useStyles = createStyles(({ error, scale, theme, leftIcon, rightIcon }: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      borderRadius: scale(10),
      width: "100%",
      paddingBottom: scale(12),
      height: scale(36)
    },
    input: {
      width: "100%",
      height: scale(36),
      paddingRight: rightIcon ? scale(36) : scale(12),
      paddingLeft: leftIcon ? scale(35) : scale(12),
      borderRadius: scale(10),
      backgroundColor: hexToRGBA(theme.palette.white, 0.24),
      borderColor: error ? theme.palette.danger : theme.palette.primaryGray,
      fontWeight: "400",
      fontSize: scale(13),
      color: theme.palette.white
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
      left: scale(6),
      zIndex: 100
    },
    rightIcon: {
      width: scale(24),
      height: scale(24),
      position: "absolute",
      top: -scale(12),
      right: scale(7)
    }
  })
);

import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    loginDetailsContainer: {
      marginTop: scale(16)
    },
    loginDetails: {
      fontSize: scale(32),
      fontWeight: "600",
      lineHeight: scale(40),
      color: theme.palette.dark
    },
    forgotPassword: {
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.orange
    },
    line:{
      height: scale(1),
      backgroundColor: theme.palette.dark,
      flex: 1
    },
    orText: {
      paddingHorizontal: scale(10)
    }
  })
);

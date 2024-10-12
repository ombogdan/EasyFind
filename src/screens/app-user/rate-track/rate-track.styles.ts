import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondaryWhite
    },
    titleText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(16),
      fontWeight: "500",
      color: theme.palette.dark
    },
    dateText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(16),
      fontWeight: "500",
      color: theme.palette.gray
    },
    reviewInput: {
      height: scale(116),
    },
    reviewInputContainer:{
      height: scale(44),
    }
  })
);

import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "shared/constants";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    loginDetailsContainer: {
      marginTop: scale(16)
    },
    loginDetails: {
      fontFamily: "TT Hoves Pro Trial",
      fontSize: scale(32),
      fontWeight: "600",
      lineHeight: scale(40),
      color: theme.palette.dark
    },
    text: {
      fontFamily: FONT_FAMILY.regular,
      fontSize: scale(FONT_SIZE.lg),
      color: theme.palette.dark
    }
  })
);

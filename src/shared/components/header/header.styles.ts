import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";
import { SCREEN_WIDTH } from "constants/index";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      height: scale(60),
      backgroundColor: theme.palette.secondaryWhite,
      width: SCREEN_WIDTH,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 1,
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondaryDisabled,
      paddingHorizontal: scale(16)
    },
    nameText: {
      fontSize: scale(16),
      fontWeight: "500",
      color: theme.palette.dark,
      maxWidth: '70%',
    },
    leftButtonContainer: {
      width: scale(40),
    }
  })
);

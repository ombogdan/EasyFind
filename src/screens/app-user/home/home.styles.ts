import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";
import { hexToRGBA } from "utils/hexToRgba";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.backgroundLight
    },
    homeBackground: {
      height: scale(115),
      position: "absolute"
    },
    mapButtonContainer: {
      padding: scale(5),
      borderRadius: scale(10),
      backgroundColor: hexToRGBA(theme.palette.white, 0.24)
    },
    allServices: {
      fontWeight: "600",
      fontSize: scale(20),
      color: theme.palette.dark
    }
  })
);

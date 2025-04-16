import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: scale(14)
    },
    map: {
      height: "100%",
      width: "100%"
    },
    notVisibleMap: {
      height: scale(15),
      opacity: 0
    }
  })
);

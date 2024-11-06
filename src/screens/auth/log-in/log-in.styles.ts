import { Dimensions, StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: Dimensions.get("window").height
    },
    logo: {
      height: scale(288),
      width: scale(288),
    },
    mainContainer:{
      height: Dimensions.get("window").height,
      justifyContent: "space-between"
    }
  })
);

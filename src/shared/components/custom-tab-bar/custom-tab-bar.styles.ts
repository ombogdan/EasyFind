import { Platform, StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      height: Platform.OS==="ios" ? scale(104) : scale(70),
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme.palette.dark,
      borderTopLeftRadius: scale(16),
      borderTopRightRadius: scale(16),
      paddingHorizontal: scale(8)
    },
    tabContainer: {
      width: scale(89),
      alignItems: "center"
    },
    tabIcon:{
      marginBottom: scale(8)
    }
  })
);

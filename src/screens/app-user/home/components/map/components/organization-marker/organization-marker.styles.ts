import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      width: scale(34),
      height: scale(34),
      borderRadius: scale(17),
      backgroundColor: theme.palette.white,
      overflow: "hidden",
      borderWidth: scale(2),
      borderColor: theme.palette.dark
    },
    selectedContainer:{
      width: scale(44),
      height: scale(44),
      borderRadius: scale(22),
      backgroundColor: theme.palette.white,
      overflow: "hidden",
      borderWidth: scale(2),
      borderColor: theme.palette.dark
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: scale(22)
    }
  })
);

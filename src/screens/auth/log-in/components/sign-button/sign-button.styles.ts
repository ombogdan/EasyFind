import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale, apple }: any) =>
  StyleSheet.create({
    buttonContainer: {
      height: scale(52),
      backgroundColor: apple ? theme.palette.dark : theme.palette.white,
      width: "100%",
      borderRadius: scale(14),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    textColor: {
      color: !apple ? theme.palette.dark : theme.palette.white,
      fontWeight: "700",
      fontSize: scale(16),
      marginLeft: scale(13)
    },
    loader: {
      height: scale(72),
      width: scale(60)
    },
  })
);

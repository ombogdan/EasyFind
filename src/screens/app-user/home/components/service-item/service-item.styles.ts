import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      marginTop: scale(15),
      backgroundColor: theme.palette.white,
      borderRadius: scale(14),
      padding: scale(10)
    },
    image: {
      height: scale(200),
      width: "100%",
      borderRadius: scale(14)
    },
    name: {
      fontWeight: "500",
      fontSize: scale(16)
    },
    kilometers:{
      fontWeight: "400",
      fontSize: scale(13)
    }
  })
);

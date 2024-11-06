import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ scale, theme}: any) =>
  StyleSheet.create({
    container: {
      height: scale(44),
      borderRadius: scale(6),
      alignItems: 'center',
      paddingHorizontal: scale(10),
      backgroundColor: theme.palette.dark,
      flexDirection: 'row'
    },
    searchPlaceholder:{
      marginLeft: scale(10),
      color: theme.palette.grayLight,
    }
  })
);

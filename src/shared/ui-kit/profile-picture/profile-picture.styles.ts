import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ scale, theme, width, height, uri }: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.palette.white,
      borderWidth: 1,
      borderColor: theme.palette.gray,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: width ? scale(width) : scale(50),
      height: height ? scale(height) : scale(50),
    },
    image: {
      width: !uri ? '65%' : '100%',
      height: !uri ? '65%' : '100%',
      borderRadius: !uri ? 0 : 50,
      ...(!uri ? {tintColor: theme.palette.dark} : {}),
    }
  })
);

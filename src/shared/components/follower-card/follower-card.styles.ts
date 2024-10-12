import { StyleSheet } from "react-native";
import { SIZE } from "shared/constants";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: theme.palette.secondary,
      borderRadius: SIZE.md,
      paddingVertical: SIZE.s2m,
      paddingHorizontal: SIZE.sm,
      borderWidth: 2,
      flexDirection: 'row',
      alignItems: 'center',
    }
  })
);

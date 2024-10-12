import { StyleSheet } from "react-native";
import { SIZE } from "shared/constants";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondaryWhite
    },
    loader: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      gap: scale(SIZE.sm),
      paddingHorizontal: scale(SIZE.md),
      paddingVertical: scale(SIZE.xl),
      paddingBottom: scale(SIZE.x3l),
    }
  })
);

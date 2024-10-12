import { StyleSheet } from "react-native";
import { SIZE } from "shared/constants";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale, insets }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary
    },
    headerContainer: {
      height: scale(60),
      paddingHorizontal: scale(SIZE.md),
      paddingVertical: scale(SIZE.sm),
      backgroundColor: theme.palette.secondaryWhite,
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondaryDisabled,
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    listContainer: {
      gap: SIZE.sm,
      paddingHorizontal: SIZE.md,
      marginTop: SIZE.xl,
      paddingBottom: 150,
    },
    itemContainer: {
      borderRadius: scale(SIZE.md),
      borderWidth: SIZE.xs,
      padding: SIZE.md,
      backgroundColor: theme.palette.white,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: theme.palette.dark,
      borderTopLeftRadius: scale(SIZE.md),
      borderTopRightRadius: scale(SIZE.md),
      padding: scale(SIZE.xl),
      paddingBottom: scale(SIZE.xl) + insets.bottom / 2,
    },
  })
);

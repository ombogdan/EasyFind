import { StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE, SIZE } from "shared/constants";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    noResults: {
      fontFamily: FONT_FAMILY.bold,
      fontSize: scale(FONT_SIZE.xl),
      fontWeight: "600",
      color: theme.palette.dark,
    },
    notFoundContainer: {
      marginTop: scale(SIZE.sm),
      width: scale(230)
    },
    noResultsAdditional: {
      fontFamily: FONT_FAMILY.semibold,
      fontSize: scale(FONT_SIZE.lg),
      fontWeight: "400",
      textAlign: "center",
      color: theme.palette.gray,
    }
  })
);

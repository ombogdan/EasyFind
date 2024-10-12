import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({theme, scale}: any) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
    },
    albumIcon: {
      width: scale(56),
      height: scale(56),
      borderRadius: scale(8)
    },
    albumName: {
      fontFamily: FONT_FAMILY.semibold,
      fontSize: scale(FONT_SIZE.md),
      fontWeight: "500",
      color: theme.palette.dark
    },
    authorName: {
      fontFamily: FONT_FAMILY.semibold,
      fontSize: scale(FONT_SIZE.md),
      fontWeight: "400",
      color: theme.palette.primaryGray
    },
    nameContainer: {
      marginLeft: scale(SIZE.sm),
      width: "70%"
    }
  }),
);

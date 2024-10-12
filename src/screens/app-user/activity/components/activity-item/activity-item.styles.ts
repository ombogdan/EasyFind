import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({scale, theme}: any) =>
  StyleSheet.create({
    container: {
      borderRadius: scale(SIZE.md),
      borderWidth: scale(SIZE.xs),
      padding: SIZE.s2m,
      paddingHorizontal: SIZE.sm,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.palette.secondary
    },
    timeContainer: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      paddingHorizontal: scale(SIZE.md),
      paddingBottom: scale(4),
    },
    time: {
      fontFamily: FONT_FAMILY.regular,
      fontSize: scale(FONT_SIZE.md),
      color: theme.palette.grayPrimary
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
      color: theme.palette.dark
    },
    nameContainer: {
      marginLeft: scale(SIZE.sm),
      flex: 1,
    }
  }),
);

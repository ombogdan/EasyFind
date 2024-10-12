import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SCREEN_WIDTH, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      borderWidth: scale(SIZE.xs),
      borderColor: theme.palette.dark,
      borderRadius: scale(SIZE.md),
      backgroundColor: theme.palette.dark,
      width: SCREEN_WIDTH * 0.35,
      paddingBottom: scale(SIZE.sm),
    },
    image: {
      width: '100%',
      borderRadius: SIZE.md,
    },
    name: {
      color: theme.palette.white,
      textAlign: 'center',
      fontSize: scale(FONT_SIZE.md),
      fontWeight: '500',
      paddingHorizontal: scale(SIZE.sm),
    },
    describe: {
      color: theme.palette.gray,
      textAlign: 'center',
      fontSize: scale(FONT_SIZE.md),
      fontWeight: '500',
      paddingHorizontal: scale(SIZE.sm),
    },
    rateContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: scale(SIZE.xs),
      alignItems: 'center',
    },
    rate: {
      fontFamily: FONT_FAMILY.digit,
      color: theme.palette.white,
      fontSize: scale(FONT_SIZE.xxl),
      paddingLeft: scale(SIZE.x2s),
    },
    rateSmall: {
      fontFamily: FONT_FAMILY.digit,
      color: theme.palette.white,
      fontSize: scale(FONT_SIZE.md),
      paddingLeft: scale(SIZE.x2s),
    },
  }),
);

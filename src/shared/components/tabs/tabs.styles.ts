import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({theme, scale}: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: scale(SIZE.md),
      borderWidth: scale(SIZE.xs),
      borderColor: theme.palette.dark,
      backgroundColor: theme.palette.secondary,
      padding: scale(SIZE.x2s),
    },
    textContainer: {
      flex: 0.5,
    },
    text: {
      fontSize: scale(FONT_SIZE.lg),
      color: theme.palette.dark,
      textAlign: 'center',
      fontFamily: FONT_FAMILY.semibold,
      borderRadius: scale(SIZE.md),
      fontWeight: '500',
      paddingVertical: scale(SIZE.s2m),
    },
    activeTab: {
      backgroundColor: theme.palette.dark,
      color: theme.palette.white,
      borderColor: theme.palette.white,
      borderRadius: scale(SIZE.s2m),
      overflow: 'hidden',
    }
  }),
);

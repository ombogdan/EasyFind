import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SCREEN_WIDTH, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    loadMoreText: {
      fontFamily: FONT_FAMILY.semibold,
      fontSize: scale(FONT_SIZE.lg),
      fontWeight: '500',
      color: theme.palette.orange,
    },
    container: {
      width: SCREEN_WIDTH,
      paddingHorizontal: scale(SIZE.md),
    },
  }),
);

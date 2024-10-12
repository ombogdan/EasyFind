import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      borderRadius: scale(SIZE.sm),
      width: scale(65),
    },
    image: {
      width: scale(65),
      height: scale(65),
      borderRadius: scale(SIZE.sm),
    },
    title: {
      fontSize: scale(FONT_SIZE.md),
      fontFamily: FONT_FAMILY.regular,
      fontWeight: '500',
    },
    describe: {
      fontSize: scale(FONT_SIZE.md),
      fontFamily: FONT_FAMILY.regular,
      color: theme.palette.gray,
    },
  }),
);

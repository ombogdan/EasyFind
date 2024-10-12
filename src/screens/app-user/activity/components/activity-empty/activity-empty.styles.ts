import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({scale, theme}: any) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    text: {
      fontSize: scale(FONT_SIZE.xl),
      fontFamily: FONT_FAMILY.semibold,
      fontWeight: '600',
    },
    description: {
      color: theme.palette.gray,
      maxWidth: '70%',
      textAlign: 'center',
      marginTop: SIZE.sm,
      fontSize: scale(FONT_SIZE.lg),
      fontFamily: FONT_FAMILY.semibold,
    }
  }),
);

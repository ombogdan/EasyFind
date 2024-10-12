import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    text: {
      fontSize: scale(FONT_SIZE.xl),
      fontFamily: FONT_FAMILY.semibold,
      fontWeight: '600',
    },
  }),
);
import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({theme, scale}: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary
    },
    scrollContainer: {
      padding: SIZE.md
    },
    text: {
      fontFamily: FONT_FAMILY.regular,
      fontSize: scale(FONT_SIZE.lg),
      color: theme.palette.dark,
    }
  }),
);

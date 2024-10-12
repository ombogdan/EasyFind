import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      width: SCREEN_WIDTH,
    },
    scrollContainer: {
      marginTop: scale(SIZE.md),
      gap: scale(SIZE.sm),
      paddingHorizontal: scale(SIZE.md),
    },
    arrowButton: {
      height: scale(40),
      width: scale(40),
      marginRight: scale(2),
    }
  }),
);

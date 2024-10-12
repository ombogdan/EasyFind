import { StyleSheet } from 'react-native';
import { SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({theme, scale, radius}: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: theme.palette.dark,
      width: '100%',
      height: '100%',
      borderRadius: scale(radius),
      zIndex: -1,
      top: scale(SIZE.x2s),
      right: scale(SIZE.xs),
    },
  }),
);

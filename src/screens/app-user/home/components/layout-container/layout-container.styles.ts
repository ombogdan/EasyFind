import { StyleSheet } from 'react-native';
import { SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({theme}: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.palette.secondary,
      flex: 1,
    },
    wrap: {
      flex: 1,
    },
    scrollContainer: {
      paddingVertical: SIZE.xl,
    }
  }),
);

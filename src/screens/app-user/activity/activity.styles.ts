import { StyleSheet } from 'react-native';
import { SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({scale, theme}: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary
    },
    listContainer:{
      gap: SIZE.sm,
      paddingHorizontal: SIZE.md,
    },
    refreshControl: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    btn:{
      zIndex: 100
    }
  }),
);

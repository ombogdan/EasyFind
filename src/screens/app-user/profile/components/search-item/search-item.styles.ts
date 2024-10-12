import { StyleSheet } from 'react-native';
import { SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    itemContainer: {
      borderRadius: scale(SIZE.md),
      borderWidth: SIZE.xs,
      padding: SIZE.s2m,
      paddingHorizontal: SIZE.sm,
      backgroundColor: theme.palette.white,
    },
  }),
);

import { StyleSheet } from 'react-native';
import { SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary,
    },
    listContainer: {
      paddingTop: SIZE.xl,
      paddingHorizontal: SIZE.md,
      gap: SIZE.md
    },
  }),
);

import { StyleSheet } from 'react-native';
import { SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      gap: SIZE.sm,
      paddingHorizontal: SIZE.md,
      paddingTop: SIZE.md,
      paddingBottom: SIZE.xl,
    },
  }),
);

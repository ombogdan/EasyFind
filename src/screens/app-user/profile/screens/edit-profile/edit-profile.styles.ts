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
      gap: SIZE.md,
    },
    itemContainer: {
      borderRadius: scale(SIZE.md),
      borderWidth: SIZE.xs,
      padding: SIZE.md,
      backgroundColor: theme.palette.white,
    },
    avatarLoading: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 2,
    },
    avatarDeleteIcon: {
      position: 'absolute',
      right: 0,
      zIndex: 2,
      borderRadius: 50,
      backgroundColor: theme.palette.secondary
    }
  }),
);

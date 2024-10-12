import { StyleSheet } from 'react-native';
import { SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale, insets }: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.palette.secondary,
      flex: 1,
      paddingTop: insets.top,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      paddingVertical: SIZE.md,
      paddingHorizontal: SIZE.md
    },
    optionContainer: {
      backgroundColor: theme.palette.secondary,
      borderWidth: 2,
      borderRadius: scale(SIZE.md),
      gap: SIZE.md,
      padding: SIZE.md,
    },
    message: {
      height: scale(116),
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: theme.palette.dark,
      borderTopLeftRadius: scale(SIZE.md),
      borderTopRightRadius: scale(SIZE.md),
      padding: scale(SIZE.xl),
      paddingBottom: scale(SIZE.xl) + insets.bottom / 2,
    },
  }),
);

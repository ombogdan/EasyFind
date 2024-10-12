import { StyleSheet } from 'react-native';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme }: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 2,
    },
    transparentContainer: {
      backgroundColor: theme.palette.dark,
      position: 'absolute',
      opacity: 0.1,
      width: '100%',
      height: '100%',
    },
    spinner: {
      height: 150,
      width: 150,
    },
  }),
);

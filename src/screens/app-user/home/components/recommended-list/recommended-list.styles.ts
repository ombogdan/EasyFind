import { StyleSheet } from 'react-native';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ scale }: any) =>
  StyleSheet.create({
    arrowButton: {
      height: scale(40),
      width: scale(40),
      marginRight: scale(2),
    },
  }),
);

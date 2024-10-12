import { StyleSheet } from 'react-native';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, color = 'black', size, enable_color }: any) =>
  StyleSheet.create({
    icon: {
      ...(enable_color ? {tintColor: theme.palette[color]} : {}),
      width: size,
      height: size,
    },
  }),
);

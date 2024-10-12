import { StyleSheet } from 'react-native';
import { FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    filterItemActive: {
      backgroundColor: theme.palette.orange,
    },
    filterItem: {
      borderRadius: 50,
      padding: SIZE.s,
      paddingHorizontal: SIZE.s2m,
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: theme.palette.orange,
    },
    filterItemText: {
      fontSize: scale(FONT_SIZE.md),
      color: theme.palette.dark,
    },
    filterItemTextActive: {
      color: theme.palette.white,
    },
  }),
);

import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      marginTop: SIZE.xl,
      paddingHorizontal: SIZE.xl,
    },
    text: {
      textAlign: 'center',
      color: theme.palette.gray,
      fontSize: scale(FONT_SIZE.lg),
      fontFamily: FONT_FAMILY.regular,
    },
  }),
);

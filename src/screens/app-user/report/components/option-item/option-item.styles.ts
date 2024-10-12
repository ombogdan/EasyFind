import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale, is_selected }: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.palette.secondary,
      flex: 1,
    },
    icon: {
      borderRadius: 50,
      borderWidth: 1,
      padding: SIZE.s2m,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: is_selected ? theme.palette.orange : theme.palette.black,
      backgroundColor: is_selected ? theme.palette.orange : theme.palette.black,
    },
    circle: {
      borderRadius: 50,
      padding: SIZE.s,
      backgroundColor: is_selected
        ? theme.palette.white
        : theme.palette.secondary,
      position: 'absolute',
    },
    text: {
      fontSize: scale(FONT_SIZE.md),
      fontFamily: FONT_FAMILY.regular,
      color: theme.palette.black,
      fontWeight: '500',
    },
  }),
);
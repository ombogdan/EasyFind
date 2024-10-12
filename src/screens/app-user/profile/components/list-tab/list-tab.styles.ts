import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({theme, scale}: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.white
    },
    chatContainer:{
      flex: 1,
      backgroundColor: theme.palette.transparentGray,
    },
    btn:{
      zIndex: 100
    },
    loadMoreText: {
      fontFamily: FONT_FAMILY.semibold,
      fontSize: scale(FONT_SIZE.lg),
      fontWeight: '500',
      color: theme.palette.orange,
    },
  }),
);

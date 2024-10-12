import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: SIZE.md,
      paddingVertical: SIZE.xl,
      backgroundColor: theme.palette.secondary,
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondaryDisabled,
    },
    buttonText: {
      fontSize: scale(FONT_SIZE.lg),
      color: theme.palette.orange,
      fontFamily: FONT_FAMILY.regular,
      fontWeight: '500',
    },
    title: {
      fontSize: scale(FONT_SIZE.lg),
      color: theme.palette.dark,
      fontFamily: FONT_FAMILY.regular,
      fontWeight: '500',
    },
    border: {
      width: '100%',
      height: 1,
      backgroundColor: theme.palette.secondaryDisabled,
    },
    filterTitle: {
      fontSize: scale(FONT_SIZE.md),
      color: theme.palette.dark,
      fontFamily: FONT_FAMILY.regular,
    },
    filterTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: SIZE.md,
    },
    arrowContainer: {
      position: 'absolute',
      right: 0,
    },
  }),
);

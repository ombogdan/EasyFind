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
      height: scale(60),
      paddingHorizontal: scale(SIZE.md),
      paddingVertical: scale(SIZE.sm),
      paddingBottom: 0,
      backgroundColor: theme.palette.secondaryWhite,
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondaryDisabled,
      flexDirection: 'row',
    },
    done: {
      fontSize: scale(FONT_SIZE.lg),
      fontFamily: FONT_FAMILY.regular,
      color: theme.palette.orange,
      fontWeight: '500',
      paddingBottom: SIZE.sm,
    },
    notFoundTitle: {
      fontSize: scale(FONT_SIZE.xl),
      fontFamily: FONT_FAMILY.semibold,
      fontWeight: '600',
    },
    notFoundDescribe: {
      fontSize: scale(FONT_SIZE.lg),
      fontFamily: FONT_FAMILY.regular,
      color: theme.palette.gray,
      maxWidth: '70%',
      textAlign: 'center',
      marginTop: SIZE.sm,
    },
    notFoundIcon: {
      height: scale(50),
      width: scale(50),
    },
    listContainer: {
      paddingHorizontal: SIZE.md,
      paddingBottom: SIZE.xl,
    },
    searchLoadingContainer: {
      position: 'absolute',
      zIndex: 1,
      right: scale(15),
      bottom: -scale(8),
    },
    searchLoading: {
      height: scale(70),
      width: scale(70),
    },
  }),
);

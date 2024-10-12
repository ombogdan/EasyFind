import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SCREEN_WIDTH, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale, insets }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary,
      paddingTop: insets.top,
    },
    nameContainer: {
      height: scale(44),
    },
    describe: {
      height: scale(116),
    },
    checkboxContainer: {
      borderColor: theme.palette.dark,
      borderRadius: scale(SIZE.md),
      borderWidth: scale(SIZE.xs),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scale(SIZE.s2m),
      flexDirection: 'row',
    },
    checkboxText: {
      color: theme.palette.dark,
      fontSize: scale(FONT_SIZE.lg),
      fontFamily: FONT_FAMILY.regular,
      fontWeight: '500',
    },
    checkboxActive: {
      color: theme.palette.secondary,
      backgroundColor: theme.palette.disabled,
    },
    buttonContainer: {
      backgroundColor: theme.palette.dark,
      borderTopLeftRadius: scale(SIZE.md),
      borderTopRightRadius: scale(SIZE.md),
      padding: scale(SIZE.xl),
      paddingBottom: scale(SIZE.xl) + insets.bottom / 2,
    },
    listContainer: {
      paddingBottom: SIZE.xl,
    },
    addMoreText: {
      fontSize: scale(FONT_SIZE.lg),
      fontFamily: FONT_FAMILY.regular,
      color: theme.palette.orange,
      fontWeight: '500',
    },
    addMusicButton: {
      width: SCREEN_WIDTH * 0.5,
    },
    musicContainer: {
      borderRadius: SIZE.md,
      borderWidth: SIZE.xs,
      padding: SIZE.md,
      backgroundColor: theme.palette.white,
    },
    entryText: {
      fontSize: scale(FONT_SIZE.lg),
      fontFamily: FONT_FAMILY.regular,
      textDecorationLine: 'underline',
      alignSelf: 'flex-end',
    },
    musicListContainer: {
      gap: SIZE.md,
      flexWrap: 'wrap',
    },
    errorText: {
      color: theme.palette.danger,
      fontSize: scale(FONT_SIZE.md),
    }
  }),
);

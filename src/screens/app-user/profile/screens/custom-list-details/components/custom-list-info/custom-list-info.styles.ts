import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      borderRadius: scale(16),
      borderWidth: scale(2),
      borderColor: theme.palette.dark,
      padding: scale(16),
      backgroundColor: theme.palette.secondaryWhite,
    },
    titleReview: {
      fontSize: scale(16),
      fontWeight: '500',
      color: theme.palette.black,
    },
    userName: {
      fontSize: scale(14),
      fontWeight: '500',
      color: theme.palette.black,
    },
    textReview: {
      fontSize: scale(14),
      fontWeight: '400',
      color: theme.palette.dark,
    },
    likeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: scale(8),
    },
    likeCount: {
      marginLeft: scale(4),
    },
    grayLine: {
      backgroundColor: theme.palette.secondaryDisabled,
      height: scale(1),
      width: '100%',
      marginTop: scale(24),
    },
    entryText: {
      fontSize: scale(FONT_SIZE.lg),
      fontFamily: FONT_FAMILY.regular,
      textDecorationLine: 'underline',
      alignSelf: 'flex-end',
    },
    date: {
      fontSize: scale(FONT_SIZE.lg),
      fontWeight: '500',
      color: theme.palette.gray,
    },
    listContainer: {
      gap: SIZE.md,
      flexWrap: 'wrap',
    },
  }),
);

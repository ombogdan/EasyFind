import { Dimensions, StyleSheet } from 'react-native';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, insets, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondaryWhite,
    },
    containerBottomSheet: {
      backgroundColor: '#2B292440',
      height: Dimensions.get('window').height - insets.top - insets.bottom,
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 1000,
    },
    dimBackground: {
      backgroundColor: 'rgba(232,226,226,0)',
      height: 0,
    },
    genresContainer: {
      width: '60%',
      alignItems: 'flex-end',
    },
    buttonItemContainer: {
      width: '48%',
    },
    sheetItemContainer: {
      height: scale(52),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondary,
    },
    sheetButtonText: {
      fontFamily: 'SF-Pro-Display-Semibold',
      fontSize: scale(16),
      fontWeight: '400',
      color: theme.palette.dark,
    },
    contentContainer: {
      flex: 1,
      padding: scale(16),
      paddingTop: 0,
    },
    scrollContainer: {
      flex: 1,
      paddingHorizontal: scale(16),
    },
    authorName: {
      fontSize: scale(13),
      fontWeight: '500',
      color: theme.palette.dark,
    },
    dateReview: {
      fontSize: scale(13),
      fontWeight: '500',
      color: theme.palette.gray,
    },
    titleReview: {
      fontSize: scale(16),
      fontWeight: '500',
      color: theme.palette.black,
    },
    loaderContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: {
      height: scale(150),
      width: scale(150),
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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2B292440',
    },
    modalView: {
      height: scale(186),
      width: scale(300),
      padding: scale(16),
      backgroundColor: theme.palette.white,
      borderRadius: scale(16),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scale(28),
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: '#2196F3',
      marginHorizontal: 10,
    },
    modalText: {
      marginVertical: scale(8),
      textAlign: 'center',
      fontSize: scale(20),
      fontWeight: '600',
    },
    permanentText: {
      color: theme.palette.gray,
    },
    buttonCancel: {
      width: scale(130),
      height: scale(44),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDone: {
      width: scale(130),
      height: scale(44),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(8),
      borderWidth: scale(2),
      borderColor: theme.palette.dark,
    },
    modalButtonText: {
      fontSize: scale(16),
      fontWeight: '500',
      color: theme.palette.dark,
    },
    inputContainer: {
      maxWidth: Dimensions.get('window').width,
      height: scale(70) + insets.bottom,
      backgroundColor: theme.palette.dark,
      padding: scale(16),
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'white',
    },
    styleInput: {
      borderColor: theme.palette.orange,
    },
    sendText: {
      color: theme.palette.orange,
      fontSize: scale(16),
      fontWeight: '500',
      textAlign: 'center',
      paddingLeft: scale(6),
      top: scale(10),
    },
    sendTextContainer: {
      alignItems: 'center',
    },
    viewAllComment: {
      fontSize: scale(14),
      fontWeight: '500',
      color: theme.palette.orange,
    },
    viewAllCommentContainer: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    loadMoreContainer: {
      position: 'absolute',
      right: -scale(-50),
    },
    loadMore: {
      width: scale(60),
      height: scale(60),
    },
    addCommentLoadContainer: {
      position: 'absolute',
      zIndex: 10,
      right: 0,
    },
    addCommentLoad: {
      width: scale(50),
      height: scale(50),
    }
  }),
);

import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      marginBottom: scale(24),
      paddingBottom: scale(16),
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondaryDisabled
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    viewAllComment: {
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.orange
    },
    username: {
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.dark
    },
    textContainer: {
      marginLeft: scale(36)
    },
    likeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: scale(8)
    },
    replyText: {
      color: theme.palette.orange,
      fontSize: scale(14),
      fontWeight: "500"
    },
    deleteText: {
      color: theme.palette.danger,
      fontSize: scale(14),
      fontWeight: "500"
    },
    editText: {
      color: theme.palette.dark,
      fontSize: scale(14),
      fontWeight: "500"
    },
    replyComment: {
      fontSize: scale(14),
      fontWeight: "400"
    },
    buttonReplyContainer:{
      marginRight: scale(8)
    },
    commentText:{
      color: theme.palette.dark
    },
    loaderContainer: {},
    loader: {
      height: scale(50),
      width: scale(50)
    },
  })
);

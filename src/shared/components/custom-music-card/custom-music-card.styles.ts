import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      borderRadius: scale(16),
      borderWidth: scale(2),
      borderColor: theme.palette.dark,
      padding: scale(16),
      backgroundColor: theme.palette.secondary
    },
    profileImage: {
      height: scale(25),
      width: scale(25),
      borderRadius: scale(30)
    },
    titleReview: {
      fontSize: scale(16),
      fontWeight: "500",
      color: theme.palette.black
    },
    userName: {
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.black
    },
    textReview: {
      fontSize: scale(14),
      fontWeight: "400",
      color: theme.palette.dark
    },
    likeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: scale(8)
    },
    likeCount: {
      marginLeft: scale(4)
    },
  })
);

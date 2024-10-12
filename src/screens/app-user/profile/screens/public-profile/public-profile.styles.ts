import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary
    },
    profileImage: {
      height: scale(60),
      width: scale(60),
      borderRadius: scale(30)
    },
    profileImageContainer: {
      borderRadius: scale(32),
      borderWidth: scale(2),
      borderColor: theme.palette.dark
    },
    fullNameText: {
      color: theme.palette.dark,
      fontFamily: "TT Hoves Pro Trial Bold",
      fontSize: scale(20),
      fontWeight: "600",
      paddingTop: scale(4)
    },
    subscriptionItem: {
      height: scale(30),
      width: scale(86),
      alignItems: "center"
    },
    countText: {
      fontSize: scale(12),
      fontWeight: "400",
      color: theme.palette.dark
    },
    countNameText: {
      fontSize: scale(12),
      fontWeight: "400",
      color: theme.palette.grayPrimary
    }
  })
);

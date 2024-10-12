import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: scale(80),
      borderRadius: scale(16),
      borderWidth: scale(2),
      borderColor: theme.palette.dark,
      marginBottom: scale(8),
      alignItems: "center",
      padding: scale(8),
      flexDirection: "row",
      zIndex: 100,
      bottom: scale(4),
      left: scale(2),
      backgroundColor: theme.palette.white
    },
    containerOverlay: {
      width: "100%",
      height: scale(80),
      marginBottom: scale(8),
      backgroundColor: theme.palette.dark,
      borderRadius: scale(16)
    },
    albumIcon: {
      width: scale(56),
      height: scale(56),
      borderRadius: scale(8)
    },
    albumName: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.dark
    },
    authorName: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(12),
      fontWeight: "400",
      color: theme.palette.gray
    },
    nameContainer: {
      marginLeft: scale(8),
      width: "70%"
    }
  })
);

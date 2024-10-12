import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
      maxHeight: scale(156),
      borderRadius: scale(16),
      borderWidth: scale(2),
      borderColor: theme.palette.dark,
      alignItems: "center",
      padding: scale(8),
      zIndex: 100,
      bottom: scale(4),
      left: scale(2),
      backgroundColor: theme.palette.white
    },
    containerOverlay: {
      width: "100%",
      maxHeight: scale(156),
      marginBottom: scale(8),
      backgroundColor: theme.palette.dark,
      borderRadius: scale(16)
    },
    headerContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center"
    },
    dateText: {
      fontSize: scale(12),
      fontWeight: "400",
      color: theme.palette.gray
    },
    nameTextContainer: {
      maxWidth: '50%'
    },
    nameText: {
      fontSize: scale(12),
      fontWeight: "400",
      color: theme.palette.dark,
    },
    averageRating: {
      fontFamily: "DS-Digital",
      fontSize: scale(20),
      fontWeight: "400",
      color: theme.palette.dark
    },
    totalRating: {
      fontFamily: "DS-Digital",
      fontSize: scale(14),
      fontWeight: "400",
      color: theme.palette.gray,
      bottom: scale(0)
    },
    reviewText: {
      fontSize: scale(14),
      fontWeight: "400",
      lineHeight: scale(20)
    },
    likeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: scale(8)
    },
    reviewTextContainer: {
      width: "100%",
      marginTop: scale(8),
      minHeight: scale(30)
    },
    reviewTextContainer1: {
      width: "100%",
      marginTop: scale(16),
      minHeight: scale(30),
      alignItems: "flex-end"
    }
  })
);

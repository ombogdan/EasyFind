import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: scale(64),
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
      height: scale(64),
      marginBottom: scale(8),
      backgroundColor: theme.palette.dark,
      borderRadius: scale(16)
    },
    numberContainer: {
      width: scale(40),
      alignItems: "center"
    },
    numberText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "400",
      color: theme.palette.gray
    },
    nameContainer: {
      width: "63%",
      marginRight: scale(8)
    },
    name: {
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.dark
    },
    averageRating: {
      fontFamily: "DS-Digital",
      fontSize: scale(24),
      fontWeight: "400",
      color: theme.palette.dark
    },
    totalRating: {
      fontFamily: "DS-Digital",
      fontSize: scale(14),
      fontWeight: "400",
      color: theme.palette.gray,
      bottom: scale(2)
    },
    voteText: {
      fontSize: scale(12),
      fontWeight: "400",
      color: theme.palette.gray
    }
  })
);

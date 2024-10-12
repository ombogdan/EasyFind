import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    ratingChartContainer: {
      width: "100%",
      height: scale(164),
      padding: scale(16),
      borderRadius: scale(16),
      backgroundColor: theme.palette.dark,
      marginTop: scale(16),
      justifyContent: "flex-end",
      flexDirection: "column",
      alignItems: "stretch",
    },
    bar: {
      width: scale(59),
      backgroundColor: theme.palette.orange,
      borderRadius: scale(8),
    },
    chartItemContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    bottomContainer: {
      marginTop: scale(8),
      flexDirection: "row",
      justifyContent: "space-between"
    },
    number: {
      fontFamily: "DS-Digital",
      fontSize: scale(24),
      fontWeight: "400",
      color: theme.palette.white,
      paddingRight: scale(4)
    }
  })
);

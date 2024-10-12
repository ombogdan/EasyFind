import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary
    },
    trackIcon: {
      height: scale(200),
      width: scale(200),
      borderRadius: scale(100),
      borderWidth: scale(2),
      borderColor: theme.palette.dark
    },
    artistName: {
      fontFamily: "TT Hoves Pro Trial DemiBold",
      fontSize: scale(24),
      fontWeight: "600",
      color: theme.palette.dark,
      textAlign: "center"
    },
    scrollContainer: {
      paddingHorizontal: scale(16),
      width: '100%'
    },
    describe: {
      fontFamily: "SF-Pro-Display-Medium",
      fontSize: scale(14),
      fontWeight: "400"
    },
    describeContainer:{
      marginTop: scale(8),
      width: '100%',
    },
    ratesContainer: {
      width: '100%',
      paddingTop: scale(24),
      flexDirection: "row",
      justifyContent: "space-between"
    },
    rateItemContainer: {
      position: "relative"
    },
    rateTile: {
      width: scale(109),
      height: scale(73)
    },
    rateTitle: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(12),
      fontWeight: "400",
      position: "absolute",
      color: theme.palette.gray,
      bottom: scale(8),
      left: scale(8)
    },
    ratingCountAbsolute: {
      fontFamily: "DS-Digital",
      fontSize: scale(34),
      fontWeight: "400",
      color: theme.palette.white,
      position: "absolute",
      top: scale(8),
      left: scale(8)
    },
    ratingCount: {
      fontFamily: "DS-Digital",
      fontSize: scale(34),
      fontWeight: "400",
      color: theme.palette.white,
      marginLeft: scale(5)
    },
    ratingCountFull: {
      fontFamily: "DS-Digital",
      fontSize: scale(20),
      fontWeight: "400",
      marginLeft: scale(5),
      top: scale(5),
      color: theme.palette.gray
    },
    averageRatingContainer: {
      flexDirection: "row",
      position: "absolute",
      alignItems: "center",
      top: scale(8),
      left: scale(8)
    },
    blockTitle: {
      fontFamily: "TT Hoves Pro Trial Bold",
      fontSize: scale(20),
      fontWeight: "600",
      color: theme.palette.dark
    },
    loaderContainer: {
      height: "80%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    loader: {
      height: scale(150),
      width: scale(150)
    },
    buttonItemContainer:{
      width: '48%'
    }
  })
);

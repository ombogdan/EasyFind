import { Dimensions, StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale, insets }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary
    },
    trackIcon: {
      height: scale(140),
      width: scale(140),
      borderRadius: scale(70)
    },
    trackName: {
      fontFamily: "TT Hoves Pro Trial DemiBold",
      fontSize: scale(24),
      fontWeight: "600",
      color: theme.palette.dark,
      textAlign: "center"
    },
    scrollContainer: {
      paddingHorizontal: scale(16)
    },
    artistItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: scale(14),
      maxWidth: "100%"
    },
    artistIcon: {
      width: scale(30),
      height: scale(30),
      borderRadius: scale(15),
      marginRight: scale(8)
    },
    artistName: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500",
      color: theme.palette.dark
    },
    ratesContainer: {
      paddingTop: scale(16),
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
    topReviewsTitle: {
      fontFamily: "TT Hoves Pro Trial Bold",
      fontSize: scale(20),
      fontWeight: "600",
      color: theme.palette.dark
    },
    loader: {
      height: scale(130),
      width: scale(130)
    },
    loaderContainer: {
      height: "80%",
      alignItems: "center",
      justifyContent: "center"
    },
    dateText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "400",
      color: theme.palette.gray
    },
    infoContainer: {
      backgroundColor: theme.palette.secondary,
      borderRadius: scale(16),
      borderWidth: scale(2),
      borderColor: theme.palette.dark,
      bottom: scale(4),
      left: scale(2),
      padding: scale(16),
      paddingBottom: 0
    },
    containerOverlay: {
      marginTop: scale(16),
      width: "100%",
      marginBottom: scale(8),
      backgroundColor: theme.palette.dark,
      borderRadius: scale(16),
      paddingRight: scale(2)
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: scale(16)
    },
    infoItemName: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(14),
      fontWeight: "500"
    },
    infoItemData: {
      fontFamily: "SF-Pro-Display-Light",
      fontSize: scale(14),
      fontWeight: "400",
      color: theme.palette.gray
    },
    contentContainer: {
      flex: 1,
      padding: scale(16),
      paddingTop: 0
    },
    sheetItemContainer: {
      height: scale(52),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondary
    },
    sheetButtonText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(16),
      fontWeight: "400",
      color: theme.palette.dark
    },
    containerBottomSheet: {
      backgroundColor: "#2B292440",
      height: Dimensions.get("window").height - insets.top - insets.bottom,
      position: "absolute",
      bottom: 0,
      left: 0,
      width: 1000
    },
    dimBackground: {
      backgroundColor: "rgba(232,226,226,0)",
      height: 0
    },
    genresContainer: {
      width: "60%",
      alignItems: 'flex-end'
    },
    buttonItemContainer:{
      width: '48%'
    }
  })
);

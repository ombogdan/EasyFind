import { StyleSheet } from "react-native";
import { SIZE } from "shared/constants";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      height: scale(60),
      paddingHorizontal: scale(16),
      paddingVertical: scale(8),
      backgroundColor: theme.palette.secondaryWhite,
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondaryDisabled,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    titleText: {
      fontFamily: "TT Hoves Pro Trial DemiBold",
      fontSize: scale(24),
      fontWeight: "600",
      color: theme.palette.dark
    },
    genreTilesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: scale(16)
    },
    mostPopularTilesContainer: {
      flexDirection: "row",
      marginTop: scale(16)
    },
    filterButtonContainer: {
      width: scale(102),
      height: scale(44),
      paddingHorizontal: scale(16),
      paddingVertical: scale(8),
      borderRadius: scale(16),
      borderWidth: scale(2),
      borderColor: theme.palette.primaryGray,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row"
    },
    inputContainer: {
      flex: 1,
      height: scale(44)
    },
    filterText: {
      fontFamily: "SF-Pro-Display-Medium",
      fontSize: scale(16),
      fontWeight: "500",
      color: theme.palette.dark
    },
    countContainer: {
      width: scale(24),
      height: scale(24),
      borderRadius: scale(20),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.orange,
      marginLeft: scale(8)
    },
    countText: {
      fontFamily: "SF-Pro-Display-Semibold",
      fontSize: scale(10),
      fontWeight: "400",
      textAlign: "center",
      color: theme.palette.white
    },
    viewAllAlbums: {
      fontFamily: "SF-Pro-Display-Medium",
      fontSize: scale(16),
      fontWeight: "500",
      color: theme.palette.orange
    },
    loaderContainer: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    loader: {
      height: 150,
      width: 150
    },
    notFoundImg: {
      height: scale(100),
      width: scale(100)
    },
    searchLoadingContainer: {
      position: 'absolute',
      zIndex: 20,
      right: SIZE.lg,
    },
    searchLoading: {
      height: 70,
      width: 70,
    }
  })
);

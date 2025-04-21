import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: scale(14)
    },
    map: {
      height: "100%",
      width: "100%"
    },
    notVisibleMap: {
      height: scale(15),
      opacity: 0
    },
    clusterMarker: {
      backgroundColor: theme.palette.yellow,
      borderRadius: scale(30),
      width: scale(40),
      height: scale(40),
      alignItems: "center",
      justifyContent: "center",
    },
    clusterText: {
      color: "white",
      fontWeight: "bold",
    },
  })
);

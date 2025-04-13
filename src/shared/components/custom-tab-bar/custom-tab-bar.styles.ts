import {StyleSheet} from "react-native";
import {createStyles} from "shared/theme/createStyles";

export const useStyles = createStyles(({theme, scale}: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      height: scale(78),
      justifyContent: "space-around",
      backgroundColor: theme.palette.darkLight,
    },
    tabContainer: {
      width: scale(70),
      alignItems: "center",
      marginTop: scale(10)
    },
    tabIcon: {},
    itemButtonContainer: {
      height: scale(45),
      width: scale(45),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: 'row',
      borderRadius: scale(10),
    },
    line: {
      height: scale(28),
      width: scale(1),
      backgroundColor: theme.palette.secondaryWhite,
      borderRadius: scale(5),
      opacity: 1,
    },
    tabName:{
      marginTop: scale(6),

    }
  })
)

import {StyleSheet} from "react-native";
import {createStyles} from "shared/theme/createStyles";

export const useStyles = createStyles(({theme, scale}: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      height: scale(70),
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme.palette.textDefault,
    },
    tabContainer: {
      height: scale(70),
      width: scale(70),
      alignItems: "center",
      justifyContent: "center",
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
    }
  })
)

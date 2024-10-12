import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.palette.secondary
    },
    buttonContainer: {
      flexDirection: "row",
      paddingVertical: scale(16),
      borderBottomWidth: scale(1),
      borderColor: theme.palette.secondaryDisabled,
      alignItems: "center",
      justifyContent: "space-between"
    },
    buttonText: {
      fontSize: scale(16),
      fontWeight: "400",
      color: theme.palette.dark,
      marginLeft: scale(8)
    },
    mainText: {
      fontSize: scale(16),
      fontWeight: "400",
      color: theme.palette.orange,
      marginLeft: scale(8)
    }
  })
);

import {StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    modalButtonText: {
      fontSize: scale(16),
      fontWeight: "500",
      color: theme.palette.dark
    },
    buttonDone: {
      width: scale(130),
      height: scale(44),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: scale(8),
      borderWidth: scale(2),
      borderColor: theme.palette.dark
    },
    buttonCancel: {
      width: scale(130),
      height: scale(44),
      alignItems: "center",
      justifyContent: "center"
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: scale(28)
    },
    permanentText: {
      color: theme.palette.gray
    },
    modalText: {
      marginVertical: scale(8),
      textAlign: "center",
      fontSize: scale(20),
      fontWeight: "600"
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2B292440"
    },
    modalView: {
      height: scale(186),
      width: scale(300),
      padding: scale(16),
      backgroundColor: theme.palette.white,
      borderRadius: scale(16),
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  })
);

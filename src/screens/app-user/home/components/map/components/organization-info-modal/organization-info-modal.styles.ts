import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    modalContainer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor: "#fff",
      padding: 16,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: { fontSize: 18, fontWeight: "bold" },
    close: { fontSize: 24, fontWeight: "bold" },
    image: { width: "100%", height: 150, marginTop: 12, borderRadius: 8 },
    address: { marginTop: 8, color: "#444" },
    phone: { color: "#666" },
  })
);

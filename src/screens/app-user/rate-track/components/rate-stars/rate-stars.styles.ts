import { StyleSheet } from "react-native";
import { createStyles } from "shared/theme/createStyles";

export const useStyles = createStyles(({ scale }: any) =>
  StyleSheet.create({
    starContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingItem:{
      marginRight: scale(8)
    }
  })
);

import { StyleSheet } from 'react-native';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    titleText: {
      fontFamily: 'TT Hoves Pro Trial DemiBold',
      fontSize: scale(24),
      fontWeight: '600',
      color: theme.palette.dark,
    },
    genreTilesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: scale(16),
    },
    mostPopularTilesContainer: {
      flexDirection: 'row',
      marginTop: scale(16),
    },
    loaderContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: {
      height: 150,
      width: 150,
    },
  }),
);

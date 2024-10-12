import { Text, View } from 'react-native';
import React from 'react';
import { Box } from 'shared/ui-kit/box';
import { useStyles } from './search-empty.styles';

const SearchEmpty = () => {
  const styles = useStyles();

  return (
    <Box pt={180} fullWidth alignItems="center">
    <Box pt={32}>
      <Text style={styles.noResults}>
        No results found
      </Text>
    </Box>
    <View style={styles.notFoundContainer}>
      <Text style={styles.noResultsAdditional}>
        Try adjusting your search to find what you are
        looking for
      </Text>
    </View>
  </Box>
  );
};

export default SearchEmpty;

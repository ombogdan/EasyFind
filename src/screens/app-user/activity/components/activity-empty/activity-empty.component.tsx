import { Text } from 'react-native';
import React from 'react';
import { Box } from 'shared/ui-kit/box';
import { useStyles } from './activity-empty.styles';

const ActivityEmpty = () => {
  const styles = useStyles();
  return (
    <Box style={styles.container} justifyContent='center' alignItems='center'>
      <Text style={styles.text}>No activity yet</Text>
      <Text style={styles.description}>No activity yet No activity yet No activity yet</Text>
    </Box>
  );
};

export default ActivityEmpty;

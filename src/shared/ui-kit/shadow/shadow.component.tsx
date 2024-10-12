import React from 'react';
import { View } from 'react-native';
import { useStyles } from './shadow.styles';

interface Props {
  radius: number;
}

const Shadow = ({radius}: Props) => {
  const styles = useStyles({radius});

  return <View style={styles.container} />;
};

export default Shadow;

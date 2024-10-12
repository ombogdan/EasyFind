import React from 'react';
import { Text } from 'react-native';
import { useStyles } from './title.styles';

interface Props {
  text: string;
}

const Title = ({text}: Props) => {
  const styles = useStyles();

  return <Text style={styles.text}>{text}</Text>;
};

export default Title;

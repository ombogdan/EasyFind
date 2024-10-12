import { Text, View } from 'react-native';
import React from 'react';
import { useStyles } from './empty-list.styles';

const EmptyList = ({ text }: { text: string }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default EmptyList;

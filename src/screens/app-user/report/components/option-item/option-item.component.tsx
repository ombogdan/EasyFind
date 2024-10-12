import { Text, View } from 'react-native';
import React from 'react';
import { SIZE } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { useStyles } from './option-item.styles';

interface Props {
  label: string;
  is_selected: boolean;
}

const OptionItem = ({ label, is_selected }: Props) => {
  const styles = useStyles({ is_selected });
  return (
    <Box direction="row" alignItems='center'>
      <View style={styles.icon}>
        <View style={styles.circle} />
      </View>
      <Box ml={SIZE.sm}>
        <Text style={styles.text}>{label}</Text>
      </Box>
    </Box>
  );
};

export default OptionItem;

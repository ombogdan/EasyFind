import { View, Text } from 'react-native';
import React from 'react';
import { useStyles } from './filter-item.styles';

interface Props {
  is_selected: boolean;
  value: string | number;
}

const FilterItem = ({is_selected, value}: Props) => {
  const styles = useStyles();

  return (
    <View
      style={[styles.filterItem, is_selected ? styles.filterItemActive : {}]}
    >
      <Text
        style={[
          styles.filterItemText,
          is_selected ? styles.filterItemTextActive : {},
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default FilterItem;

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'shared/ui-kit/shadow';
import { SIZE } from 'shared/constants';
import { useStyles } from './tabs.styles';
import { Props } from './tabs.types';

const Tabs = ({ actions, handlePressTab, active_tab }: Props) => {
  const styles = useStyles();

  return (
    <View>
      <Shadow radius={SIZE.md} />
      <View style={styles.container}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.key}
            onPress={() => handlePressTab(action.key)}
            style={styles.textContainer}
            activeOpacity={0.5}
          >
            <Text style={[styles.text, active_tab === action.key ? styles.activeTab : {}]}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Tabs;

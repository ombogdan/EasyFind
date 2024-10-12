import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import { Box } from 'ui-kit/box';
import { useTheme } from 'theme/ThemeProvider';
import { Props } from './outline-tabs.types';
import { useStyles } from './outline-tabs.styles';

const OutlineTabs = ({ activeTab, onChangeTab, actions }: Props) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <Box pt={16}>
      <View style={styles.container}>
        {actions.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabContainer}
            onPress={() => {
              onChangeTab(tab.key);
            }}
          >
            <Text
              style={[
                styles.tabNameText,
                {
                  color:
                    activeTab === 1
                      ? theme.palette.dark
                      : theme.palette.grayPrimary,
                },
              ]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.activeTabLine} />}
          </TouchableOpacity>
        ))}
      </View>
    </Box>
  );
};

export default OutlineTabs;

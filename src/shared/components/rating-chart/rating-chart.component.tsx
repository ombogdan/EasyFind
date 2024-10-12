import React, { useState } from "react";

import { Pressable, Text, View } from "react-native";
import { useScale } from "hooks/useScale";
import { Box } from "ui-kit/box";
import { AppIcon } from "assets/index";
import Tooltip from "react-native-walkthrough-tooltip";
import { useStyles } from "./rating-chart.styles";

const RatingChart = ({ data }: { data: number[] }) => {
  const styles = useStyles();
  const scale = useScale();
  const maxValue = Math.max(...data);
  // Створення стану для контролю видимості тултіпів
  const [toolTipVisible, setToolTipVisible] = useState(Array(data.length).fill(false));

  const handleToolTipVisibility = (index: number) => {
    const updatedVisibility = toolTipVisible.slice();
    updatedVisibility[index] = !updatedVisibility[index];
    setToolTipVisible(updatedVisibility);
  };

  return (
    <View style={styles.ratingChartContainer}>
      <View style={styles.chartItemContainer}>
        {data.map((value: number, index: number) => {
          let height = 4;
          if (maxValue > 0) {
            height = Math.max(4, (value / maxValue) * 100);
          }
          return (
            <Tooltip
              key={index}
              isVisible={toolTipVisible[index]}
              content={<Text>{value}</Text>}
              placement="top"
              onClose={() => handleToolTipVisibility(index)}>
              <Pressable style={[styles.bar, { height: scale(height) }]}
                         onPress={() => handleToolTipVisibility(index)} />
            </Tooltip>
          );
        })}
      </View>
      <View style={styles.bottomContainer}>
        <Box direction="row" alignItems="center">
          <Text style={styles.number}>1</Text>
          <AppIcon name="starFull" size={16} color="orange" />
        </Box>
        <Box direction="row" alignItems="center">
          <Text style={styles.number}>5</Text>
          <AppIcon name="starFull" size={16} color="orange" />
        </Box>

      </View>
    </View>
  );
};

export default RatingChart;

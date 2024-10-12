import React from "react";

import {TouchableOpacity, View } from "react-native";
import { AppIcon } from "assets/index";
import { APP_ICONS } from "assets/icon.data";
import { RateStarsProps, } from "./rate-stars.types";
import { useStyles } from "./rate-stars.styles";

const RateStars = ({rating, onChangeRating, iconSize }: RateStarsProps) => {
  const styles = useStyles();

  const handlePress = (value: number) => {
    if(onChangeRating) {
      if (value === rating && value !== 1) {
        onChangeRating(value - 0.5);
      } else {
        onChangeRating(value);
      }
    }
  };

  const renderStar = (index: number) => {
    const half = index + 0.5;
    let iconName: keyof typeof APP_ICONS = 'emptyStar';
    if (rating >= index + 1) {
      iconName = 'starFull';
    } else if (parseFloat(String(rating)) === parseFloat(String(half))) {
      iconName = 'starHalf';
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.ratingItem}
        onPress={() => handlePress(index + 1)}>
        <AppIcon name={iconName} size={iconSize || 30} color={iconName ==='emptyStar' ? "gray" : "orange"} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.starContainer}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </View>
  );
};

export default RateStars;

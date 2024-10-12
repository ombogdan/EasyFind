import React from "react";

import { Pressable, Text, View } from "react-native";
import { Box } from "ui-kit/box";
import { AppIcon } from "assets/index";
import { navigate } from "shared/navigation/root-navigator.config";
import { AppUserRoutes } from "shared/navigation/app-user";
import { MostPopularTileProps } from "./most-popular-tile.types";
import { useStyles } from "./most-popular-tile.styles";

const MostPopularTile = ({ track, index }: MostPopularTileProps) => {
  const styles = useStyles();
  const { id, name, averageRating } = track;

  const handleGoTrack = () => {
    navigate(AppUserRoutes.TrackDetail, { id, isTrack: true });
  };

  return (
    <Pressable onPress={handleGoTrack} style={styles.containerOverlay}>
      <View style={styles.container}>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{index}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.name}>{name}</Text>
        </View>
        <Box direction="row">
          <Box direction="column">
            <Box direction="row" alignItems="center">
              <AppIcon name="starFull" color="orange" size={16} />
              <Box direction="row" alignItems="flex-end" ml={4}>
                <Text style={styles.averageRating}>{averageRating}</Text>
                <Text style={styles.totalRating}> / 5</Text>
              </Box>
            </Box>
            <Text style={styles.voteText}>0 votes</Text>
          </Box>
        </Box>
        <Box pl={3}>
          <AppIcon name="dots" size={25} />
        </Box>
      </View>
    </Pressable>
  );
};

export default MostPopularTile;

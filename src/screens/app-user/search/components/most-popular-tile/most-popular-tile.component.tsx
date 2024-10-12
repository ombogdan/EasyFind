import React from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";
import { navigate } from "shared/navigation/root-navigator.config";
import { AppUserRoutes } from "shared/navigation/app-user";
import { TrackTileProps } from "./most-popular-tile.types";
import { useStyles } from "./most-popular-tile.styles";

const MostPopularTile = ({ trackItem }: TrackTileProps) => {
  const styles = useStyles();
  const {image, name, artist, id} = trackItem || {};
  const artistNames = (artist || []).map(art => art.name).join(", ");

  const goToTrackDetail = () => {
    navigate(AppUserRoutes.TrackDetail, {id, isTrack: true});
  }

  return (
    <TouchableOpacity onPress={goToTrackDetail} style={styles.container}>
      {(image?.[0]?.url ?? false) &&
        <Image source={{ uri: image[0].url }} style={styles.albumIcon} resizeMode="cover" />
      }
      <View style={styles.namesContainer}>
        <Text style={styles.songName} numberOfLines={1}>{name}</Text>
        <Text style={styles.artistName} numberOfLines={1}>{artistNames}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MostPopularTile;

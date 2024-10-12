import React from "react";

import { Image, Pressable, Text, View } from "react-native";
import { AppIcon } from "assets/index";
import { navigate } from "shared/navigation/root-navigator.config";
import { AppUserRoutes } from "shared/navigation/app-user";
import { GenreTileProps } from "./album-tile.types";
import { useStyles } from "./album-tile.styles";

const AlbumTile = ({ album, isTrack, isArtist, review }: GenreTileProps) => {
  const styles = useStyles();
  const { name, artist, image, id } = album;

  const goToDetail = () => {
    if (!review) {
      if (isArtist) {
        navigate(AppUserRoutes.ArtistDetail, { id });
      } else {
        navigate(AppUserRoutes.TrackDetail, { id, isTrack: !!isTrack });
      }
    }
  };

  return (
    <Pressable onPress={goToDetail} style={styles.containerOverlay}>
      <View style={styles.container}>
        {image?.[0]?.url ?
          <Image source={{ uri: image?.[0]?.url }} style={styles.albumIcon} resizeMode="cover" />
          :
          <Image source={require("shared/assets/icons/emptyImage.png")} style={styles.albumIcon} resizeMode="cover" />
        }
        <View style={styles.nameContainer}>
          <Text style={styles.albumName}>{name}</Text>
          {(artist?.[0]?.name ?? "") &&
            <Text style={styles.authorName}>{artist?.[0]?.name ?? ""}</Text>
          }
        </View>
        {!review &&
          <AppIcon name="arrow_right_small" size={35} />
        }
      </View>
    </Pressable>
  );
};

export default AlbumTile;

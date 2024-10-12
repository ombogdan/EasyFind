import React from "react";

import { Image, Text, TouchableOpacity } from "react-native";
import { useScale } from "hooks/useScale";
import { navigate } from "shared/navigation/root-navigator.config";
import { AppUserRoutes } from "shared/navigation/app-user";
import { GenreTileProps } from "./genre-tile.types";
import { useStyles } from "./genre-tile.styles";

const GenreTile = ({genreItem, index}: GenreTileProps) => {
  const styles = useStyles();
  const scale = useScale();
  const {name, image} = genreItem;

  const capitalizeFirstLetter = (string: string) => {
    if(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  const handleGoGenreDetail = () =>{
    navigate(AppUserRoutes.GenreDetailScreen, {name: capitalizeFirstLetter(name)});
  }

  return (
    <TouchableOpacity onPress={handleGoGenreDetail} style={[styles.container, {marginRight: index % 2 === 0 ? scale(8) :  scale(0) }]}>
      <Image source={{uri: image?.[0]?.url}} style={styles.albumIcon} resizeMode="cover"/>
      <Text style={styles.genreName}>{capitalizeFirstLetter(name)}</Text>
    </TouchableOpacity>
  );
};

export default GenreTile;

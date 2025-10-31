import React from "react";
import { View, Image } from "react-native";
import { Marker } from "react-native-maps";
import { useStyles } from "./organization-marker.styles";
import { OrganizationMarkerProps } from "./organization-marker.types";

const OrganizationMarker = ({
                              longitude,
                              latitude,
                              image,
                              id,
                              selectedMarkerId,
                              onSelect,
                            }: OrganizationMarkerProps) => {
  const styles = useStyles();
  const isSelected = id === selectedMarkerId;

  return (
    <Marker
      zIndex={999}
      onPress={onSelect}
      identifier={`${id}`}
      coordinate={{ latitude, longitude }}>
      <View style={isSelected ? styles.selectedContainer : styles.container}>
        <Image
          source={require("shared/assets/images/makerIcon.png")}
          style={[styles.image, { opacity: isSelected ? 0 : 1 }]}
          resizeMode="cover"
        />
        <Image
          source={{ uri: image }}
          style={[styles.image, styles.selectedImage, { position: "absolute", opacity: isSelected ? 1 : 0 }]}
          resizeMode="cover"
        />
      </View>
    </Marker>
  );
};

export default OrganizationMarker;

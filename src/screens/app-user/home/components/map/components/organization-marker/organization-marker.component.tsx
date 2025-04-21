import React from "react";
import { View, Image, Text } from "react-native";
import { Marker } from "react-native-maps";
import { useStyles } from "./organization-marker.styles";
import { OrganizationMarkerProps } from "./organization-marker.types";

const OrganizationMarker = ({ longitude, latitude, image, id }: OrganizationMarkerProps) => {
  const styles = useStyles();

  return (
    <Marker
      identifier={`organization${  id}`}
      coordinate={{ latitude, longitude }}>
      <View style={styles.container}>
         <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
         />
      </View>
    </Marker>
  );
}

export default OrganizationMarker;

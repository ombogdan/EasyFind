import React, { useRef, useState } from "react";
import { View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { ZOOM } from "constants/index";
import { useStyles } from "./map.styles";

MapboxGL.setAccessToken('sk.eyJ1Ijoic2lsdmVyMTgzNSIsImEiOiJjbTBkbnhtZ3cwZGc2Mm1zY3gzd201NHg2In0.7qIWJV3t3y6Qyhf7Yrxldg');
const Map = () => {
  const styles = useStyles();
  const mapRef = useRef(null);
  const cameraRef = useRef(null);

  const [initialRegion] = useState({
    latitude: 50.4939472,
    longitude: 30.5041288,
    zoomLevel: ZOOM
  });
  const [userLocation, setUserPosition] = useState({latitude: 0, longitude: 0});

  const handleUpdateLocation = (location: any) => {
    if (
      ((userLocation?.latitude ?? 0) !== (location?.coords?.latitude ?? 0))
    ) {
      setUserPosition({
        latitude: location?.coords?.latitude ?? 0,
        longitude: location?.coords?.longitude ?? 0,
      });
    }
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={mapRef}
        style={styles.map}>
        <MapboxGL.Camera
          ref={cameraRef}
          animationDuration={0}
          zoomLevel={initialRegion.zoomLevel}
          centerCoordinate={[initialRegion.longitude, initialRegion.latitude]}
        />
        {/* -------CURRENT_POSITION-----*/}
        <MapboxGL.UserLocation
          visible
          animated
          minDisplacement={4}
          onUpdate={handleUpdateLocation}/>
      </MapboxGL.MapView>
    </View>
  );
};

export default Map;

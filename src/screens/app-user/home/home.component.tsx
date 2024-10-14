import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { MapboxToken, ZOOM } from "constants/index";

MapboxGL.setAccessToken(MapboxToken);

const Home = () => {
  const mapRef = useRef(null);
  const cameraRef = useRef(null);
  const [initialRegion] = useState({
    latitude: 49.4404322,
    longitude: 32.0354407,
    zoomLevel: ZOOM
  });

  return (
    <View>
      <MapboxGL.MapView
        ref={mapRef}
        style={styles.map}
        styleURL="mapbox://styles/silver1835/cm0do62dc00ti01qs4olneuhw">
        <MapboxGL.Camera
          ref={cameraRef}
          animationDuration={0}
          zoomLevel={initialRegion.zoomLevel}
          centerCoordinate={[initialRegion.longitude, initialRegion.latitude]}
        />
      </MapboxGL.MapView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  map: {
    height: Platform.select({
      ios: Dimensions.get("window").height - 80,
      android: Dimensions.get("window").height - 50
    })
  }
});

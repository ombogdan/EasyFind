import React, { useRef, useState } from "react";
import { Platform, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useTypedDispatch } from "store/index";
import { userActions } from "store/slices/user";
import { MapProps } from "screens/app-user/home/components/map/map.types";
import { useClusteredPoints } from "hooks/useClusteredPoints";
import { useStyles } from "./map.styles";
import OrganizationMarker from "./components/organization-marker/organization-marker.component";

const Map = ({ isShowMap, organizationsList }: MapProps) => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const mapRef = useRef<MapView>(null);

  const [initialRegion] = useState({
    latitude: 50.4939472,
    longitude: 30.5041288,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  });
  const [region, setRegion] = useState(initialRegion);
  const clusters = useClusteredPoints(organizationsList, region);

  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  const handleUpdateLocation = (event: any) => {
    const { latitude, longitude } = event?.nativeEvent?.coordinate ?? {};
    if (userLocation.latitude !== latitude || userLocation.longitude !== longitude) {
      const newLocation = { latitude, longitude };
      setUserLocation(newLocation);
      dispatch(userActions.setUserLocation(newLocation));
    }
  };

  return (
    <View style={isShowMap ? styles.container : styles.notVisibleMap}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        initialRegion={initialRegion}
        showsUserLocation
        onRegionChangeComplete={setRegion}
        onUserLocationChange={handleUpdateLocation}>
        {clusters.map((item) =>
          item.isCluster ? (
            <Marker
              key={`cluster-${item.id}`}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              onPress={() => {
                mapRef.current?.animateToRegion({
                  ...region,
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: region.latitudeDelta / 2,
                  longitudeDelta: region.longitudeDelta / 2,
                });
              }}>
              <View style={styles.clusterMarker}>
                <Text style={styles.clusterText}>{item.count}</Text>
              </View>
            </Marker>
          ) : (
            <OrganizationMarker
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              latitude={item.latitude}
              longitude={item.longitude}
              selectedMarkerId={selectedMarkerId}
              onSelect={() => setSelectedMarkerId(item.id)}
            />
          )
        )}
      </MapView>
    </View>
  );
};

export default Map;

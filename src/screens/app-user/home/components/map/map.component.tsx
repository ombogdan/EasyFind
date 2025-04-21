import React, { useRef, useState } from "react";
import { Platform, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useTypedDispatch } from "store/index";
import { userActions } from "store/slices/user";
import { MapProps } from "screens/app-user/home/components/map/map.types";
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
        onUserLocationChange={handleUpdateLocation}>
        {(organizationsList || []).map((org) => (
          <OrganizationMarker
            id={org.id}
            key={org.id}
            name={org.name}
            image={org.image}
            latitude={org.latitude}
            longitude={org.longitude}
            selectedMarkerId={selectedMarkerId}
            onSelect={() => setSelectedMarkerId(org.id)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;

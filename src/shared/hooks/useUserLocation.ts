import { SetStateAction, useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

type Location = {
  latitude: number;
  longitude: number;
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        const permission =
          Platform.OS === "ios"
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

        const result = await check(permission);
        if (result !== RESULTS.GRANTED) {
          const req = await request(permission);
          if (req !== RESULTS.GRANTED) {
            setError("Доступ до геолокації заборонений");
            setLoading(false);
            return;
          }
        }

        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (!granted) {
            const permissionResult = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (permissionResult !== PermissionsAndroid.RESULTS.GRANTED) {
              setError("Геолокація недоступна");
              setLoading(false);
              return;
            }
          }
        }

        Geolocation.getCurrentPosition(
          (position: { coords: { latitude: any; longitude: any; }; }) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            setLoading(false);
          },
          (err: { message: SetStateAction<string | null>; }) => {
            setError(err.message);
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (e: any) {
        setError(e.message || 'Невідома помилка');
        setLoading(false);
      }
    };

    getPermissionAndLocation();
  }, []);

  return { location, loading, error };
};

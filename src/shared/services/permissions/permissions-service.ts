import { Alert, Platform } from "react-native";
import {
  request,
  PERMISSIONS,
  RESULTS,
  Permission
} from "react-native-permissions";
import DeviceInfo from "react-native-device-info";

import { isIOS } from "shared/constants";

const CAMERA_PERMISSIONS = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA
}) as Permission;

export const PermissionsRequest = {
  camera: async (t: any) => {
    const isGranted = await request(CAMERA_PERMISSIONS);
    if (isGranted !== RESULTS.GRANTED) {
      Alert.alert(
        t("theAppDoesNotCameraAccess"),
        t("spinStudioIsUsingPermissionForUserAvatar"),
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancelled!")
          }
        ],
        { cancelable: true }
      );
    }
  },
  storage: async (t: any) => {
    if (isIOS) {
      const isGranted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (isGranted !== RESULTS.GRANTED) {
        Alert.alert(
          t("theAppDoesNotHaveMediaAccess"),
          t("spinStudioIsUsingPermissionForUserAvatar"),
          [
            {
              text: "Ok",
              onPress: () => console.log("Cancelled!")
            }
          ],
          { cancelable: true }
        );
      }
      return isGranted === RESULTS.GRANTED;
    }
    const apiLevel = await DeviceInfo.getApiLevel();

    if (apiLevel >= 33) {
      const isGranted = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      if (isGranted !== RESULTS.GRANTED) {
        Alert.alert(
          t("theAppDoesNotHaveMediaAccess"),
          t("spinStudioIsUsingPermissionForUserAvatar"),
          [
            {
              text: "Ok",
              onPress: () => console.log("Cancelled!")
            }
          ],
          { cancelable: true }
        );
      }
      return isGranted === RESULTS.GRANTED;
    }
    const isGranted = await request(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );
    if (isGranted !== RESULTS.GRANTED) {
      Alert.alert(
        t("theAppDoesNotHaveMediaAccess"),
        t("spinStudioIsUsingPermissionForUserAvatar"),
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancelled!")
          }
        ],
        { cancelable: true }
      );
    }
    return isGranted === RESULTS.GRANTED;
  }
};

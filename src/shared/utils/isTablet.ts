import { Platform, PixelRatio, Dimensions } from 'react-native';
import DeviceInfo from "react-native-device-info";

export const isTablet = () => {
  if (Platform.OS === 'ios') {
    return DeviceInfo.isTablet();
  }
  const pixelDensity = PixelRatio.get();
  const windowDimensions = Dimensions.get('window');
  const adjustedWidth = windowDimensions.width * pixelDensity;
  const adjustedHeight = windowDimensions.height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  }
  return (
    pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  );
};

import { Platform, PixelRatio } from 'react-native';
import { BASE_TABLET_WIDTH } from 'shared/theme/constants';
import { SCREEN_WIDTH } from 'shared/constants';

const scale = SCREEN_WIDTH / BASE_TABLET_WIDTH;

export const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

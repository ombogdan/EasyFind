import { useWindowDimensions } from 'react-native';

import {
  BASE_TABLET_WIDTH,
  BASE_PHONE_WIDTH,
  BASE_TABLET_HEIGHT,
  BASE_PHONE_HEIGHT,
} from 'shared/theme/constants';
import { isTablet } from 'shared/utils/isTablet';

export const useScale = () => {
  const windowDimensions = useWindowDimensions();

  const isLandscape = windowDimensions.width > windowDimensions.height;

  let baseWidth: number;
  let shorterWindowDimension: number;

  if (isLandscape) {
    baseWidth = isTablet() ? BASE_TABLET_WIDTH : BASE_PHONE_WIDTH;
    shorterWindowDimension = windowDimensions.width;
  } else {
    baseWidth = isTablet() ? BASE_TABLET_HEIGHT : BASE_PHONE_HEIGHT;
    shorterWindowDimension = windowDimensions.height;
  }

  return (size: number) => (shorterWindowDimension / baseWidth) * size;
};

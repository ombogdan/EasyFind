import React from 'react';
import { LOTTIE_BLACK_LOADER } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import LottieView from 'lottie-react-native';

const LoadingIndicator = () => (
  <Box flex={1} alignItems="center" justifyContent="center">
    <LottieView
      style={{
        height: 150,
        width: 150,
      }}
      source={LOTTIE_BLACK_LOADER}
      autoPlay
      loop
    />
  </Box>
);

export default LoadingIndicator;

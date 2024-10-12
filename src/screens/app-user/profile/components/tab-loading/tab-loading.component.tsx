import { View } from 'react-native';
import React from 'react';
import { LOTTIE_BLACK_LOADER, SCREEN_WIDTH } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import LottieView from 'lottie-react-native';

const TabLoading = () => (
  <View
    style={{
      width: SCREEN_WIDTH,
    }}
  >
    <Box alignItems="center">
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
  </View>
);

export default TabLoading;

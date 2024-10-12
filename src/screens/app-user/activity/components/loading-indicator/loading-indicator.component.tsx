import { View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { LOTTIE_BLACK_LOADER } from 'shared/constants';

const LoadingIndicator = () => (
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <LottieView
      style={{
        height: 150,
        width: 150,
      }}
      source={LOTTIE_BLACK_LOADER}
      autoPlay
      loop
    />
  </View>
);

export default LoadingIndicator;

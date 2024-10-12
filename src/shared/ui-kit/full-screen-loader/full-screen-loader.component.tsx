import { View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { LOTTIE_BLACK_LOADER } from 'shared/constants';
import { useStyles } from './full-screen-loader.styles';
import { Box } from '../box';

const FullScreenLoader = () => {
  const styles = useStyles();
  return (
    <Box justifyContent="center" alignItems="center" style={styles.container}>
      <View style={styles.transparentContainer} />
      <LottieView
        style={styles.spinner}
        source={LOTTIE_BLACK_LOADER}
        autoPlay
        loop
      />
    </Box>
  );
};

export default FullScreenLoader;

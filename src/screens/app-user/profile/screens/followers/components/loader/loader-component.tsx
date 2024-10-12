import { StyleSheet, View } from 'react-native';
import React from 'react';
import { LOTTIE_BLACK_LOADER } from 'shared/constants';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 150,
    height: 150,
  },
});

const Loader = ({isLoading}: {isLoading: boolean}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.loader}
        source={LOTTIE_BLACK_LOADER}
        autoPlay
        loop
      />
    </View>
  );
}

export default Loader;

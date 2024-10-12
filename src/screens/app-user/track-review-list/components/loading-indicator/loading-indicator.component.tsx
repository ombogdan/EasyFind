import React from 'react';
import LottieView from 'lottie-react-native';
import { LOTTIE_BLACK_LOADER } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { useStyles } from '../../track-review-list.styles';

const LoadingIndicator = ({size}: {size: number}) => {
  const styles = useStyles();
  return (
    <Box style={styles.loader}>
      <LottieView
        style={{
          height: size,
          width: size,
        }}
        source={LOTTIE_BLACK_LOADER}
        autoPlay
        loop
      />
    </Box>
  );
};

export default LoadingIndicator;

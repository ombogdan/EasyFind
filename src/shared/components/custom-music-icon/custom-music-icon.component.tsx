import React from 'react';
import { Image, Text, View } from 'react-native';
import { Box } from 'shared/ui-kit/box';
import { SIZE } from 'shared/constants';
import { useStyles } from './custom-music-icon.styles';
import { Props } from './custom-music-icon.types';

const CustomMusicIcon = ({ uri, title, describe }: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* IMAGE */}
      <Image style={styles.image} source={{ uri }} />
      {title && (
        <Box mt={SIZE.sm}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.describe} numberOfLines={1}>
            {describe}
          </Text>
        </Box>
      )}
    </View>
  );
};

export default CustomMusicIcon;

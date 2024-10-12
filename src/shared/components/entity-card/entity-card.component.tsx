import React from 'react';

import { Image, Text, View } from 'react-native';
import { AppIcon } from 'shared/assets';
import { SIZE } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { useStyles } from './entity-card.styles';
import { Props } from './entity-card.types';

const EntityCard = ({ uri, name, rate, describe }: Props) => {
  const styles = useStyles();

  const rate_exists = typeof rate === 'number';

  return (
    <View style={styles.container}>
      {/* IMAGE */}
      <Image source={{ uri }} style={styles.image} height={140} width={140} />
      {/* NAME */}
      <Box mt={SIZE.s2m}>
        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.name}>
          {name}
        </Text>
      </Box>
      {describe && (
        <Box mt={SIZE.x2s}>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={styles.describe}
          >
            {describe}
          </Text>
        </Box>
      )}
      {rate_exists && (
        <View style={styles.rateContainer}>
          {/* STAR */}
          <AppIcon name="starFull" size={SIZE.md} color="orange" />
          {/* RATE */}
          <Text style={styles.rate}>{rate}</Text>
          <Text style={styles.rateSmall}>/5</Text>
        </View>
      )}
    </View>
  );
};

export default EntityCard;

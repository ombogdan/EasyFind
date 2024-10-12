import React from 'react';
import { Image, Text, View } from 'react-native';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import { capitalizeFirstLetter } from 'shared/utils/capitalizeFirstLetter';
import { useStyles } from './media-card.styles';
import { Props } from './media-card.types';

const MediaCard = ({ uri, title, name, type, is_user }: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* IMAGE */}
      {!is_user ? (
        <View>
          {uri ? (
            <Image
              source={{ uri }}
              style={styles.albumIcon}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require('shared/assets/icons/emptyImage.png')}
              style={styles.albumIcon}
              resizeMode="cover"
            />
          )}
        </View>
      ) : (
        <ProfilePicture uri={uri} height={56} width={56} />
      )}
      <View style={styles.nameContainer}>
        <Text numberOfLines={2} style={styles.albumName}>
          {title}
        </Text>
        {name && (
          <Text numberOfLines={2} style={styles.authorName}>
            {name ?? ''}
            {type ? ` / ${capitalizeFirstLetter(type)}` : ''}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MediaCard;

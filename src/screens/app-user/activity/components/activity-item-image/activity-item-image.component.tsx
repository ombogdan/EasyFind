import { View, Image } from 'react-native';
import React from 'react';
import { Box } from 'shared/ui-kit/box';
import { Activity } from 'shared/types';
import { useStyles } from './activity-item-image.styles';

const ActivityItemImage = ({ item }: { item: Activity }) => {
  const styles = useStyles();

  const reviewUri = item.review?.object_spotify.image[0]?.url;
  const comment_review =
    item.comment_review?.object_review.object_spotify.image[0]?.url;
  const reply_comment_review =
    item.reply_comment_review?.object_comment?.object_review.object_spotify
      .image[0]?.url;
  const customList = item?.custom_list?.list_music.slice(0, 4);
  const comment_List =
    item.custom_list_comment?.list_music.list_music.slice(0, 4) || [];

  if ((customList && customList.length > 3) || comment_List?.length > 3) {
    const targetCustomList = customList || comment_List;
    return (
      <View style={styles.container}>
        <Box direction="row">
          <Image
            source={{ uri: targetCustomList[0]?.object_spotify.image[0]?.url }}
            style={styles.imageThumb}
            resizeMode="cover"
          />
          <Image
            source={{ uri: targetCustomList[1]?.object_spotify.image[0]?.url }}
            style={styles.imageThumb}
            resizeMode="cover"
          />
        </Box>
        <Box direction="row">
          <Image
            source={{ uri: targetCustomList[2]?.object_spotify.image[0]?.url }}
            style={styles.imageThumb}
            resizeMode="cover"
          />
          <Image
            source={{ uri: targetCustomList[3]?.object_spotify.image[0]?.url }}
            style={styles.imageThumb}
            resizeMode="cover"
          />
        </Box>
      </View>
    );
  }

  return (
    <View>
      {reviewUri || comment_review || reply_comment_review ? (
        <Image
          source={{ uri: reviewUri || comment_review || reply_comment_review }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require('shared/assets/icons/emptyImage.png')}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </View>
  );
};
export default ActivityItemImage;

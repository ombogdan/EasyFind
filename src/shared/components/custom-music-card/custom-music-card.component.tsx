import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppIcon } from 'shared/assets';
import { HIT_SLOP, SIZE } from 'shared/constants';
import { useUpdateCustomMusicLike } from 'shared/hooks/api';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { navigate } from 'shared/navigation/root-navigator.config';
import { userDataSelector } from 'shared/store/slices/user';
import { LoadingType } from 'shared/types';
import { Box } from 'shared/ui-kit/box';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import { Shadow } from 'shared/ui-kit/shadow';
import { useStyles } from './custom-music-card.styles';
import { Props } from './custom-music-card.types';

const CustomMusicCard = ({ item, handleUpdate }: Props) => {
  const styles = useStyles();
  const currentUser = useSelector(userDataSelector);
  const { loading, setCustomMusicLike } = useUpdateCustomMusicLike();

  const onPressUser = (user_id: number, username: string) => () => {
    navigate(AppUserRoutes.PublicProfile, { user_id, username });
  };

  const onPressLike = (variant: 'like' | 'dislike') => () => {
    const isLike = variant === 'like';
    const userKey = isLike ? 'user_liked' : 'user_disliked';
    const countKey = isLike ? 'likes_count' : 'dislikes_count';

    const updatedItem = {
      ...item,
      [userKey]: !item[userKey],
      [countKey]: item[userKey] ? item[countKey] - 1 : item[countKey] + 1,
      ...(isLike && {
        user_disliked: item.user_disliked ? false : item.user_disliked,
        dislikes_count: item.user_disliked
          ? item.dislikes_count - 1
          : item.dislikes_count,
      }),
      ...(!isLike && {
        user_liked: item.user_liked ? false : item.user_liked,
        likes_count: item.user_liked ? item.likes_count - 1 : item.likes_count,
      }),
    };

    setCustomMusicLike({
      id: item.id,
      successCallback: () => handleUpdate(updatedItem),
      like: isLike,
    });
  };

  return (
    <View>
      <Shadow radius={16} />
      <View style={styles.container}>
        <Box
          mr={4}
          direction="row"
          style={{
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {item.list_music.slice(0, 5).map((i) => (
            <View key={i.id}>
              {i.object_spotify?.image?.length && <Image
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 8,
                }}
                source={{ uri: i.object_spotify.image[0].url }}
              />}
            </View>
          ))}
        </Box>
        <Box pt={SIZE.md}>
          <Text numberOfLines={2} style={styles.titleReview}>
            {item.name}
          </Text>
        </Box>
        {/* STARS */}
        <Box pt={SIZE.md}>
          <Text style={styles.textReview} numberOfLines={3}>
            {item.describe}
          </Text>
        </Box>
        {/* USER */}
        {item.user && (
          <TouchableOpacity
            disabled={currentUser?.id === item.user.id}
            activeOpacity={0.5}
            onPress={onPressUser(item.user.id, item.user.username)}
          >
            <Box pt={SIZE.s2m} direction="row" alignItems="center">
              <ProfilePicture
                uri={item.user.avatar || null}
                width={30}
                height={30}
              />
              <Box pl={8}>
                <Text style={styles.userName}>{item.user.full_name}</Text>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
        {/* ICONS */}
        <Box
          pt={SIZE.md}
          fullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box direction="row" justifyContent="space-between" fullWidth>
            <Box direction="row">
              <View style={styles.likeContainer}>
                <AppIcon name="comment" color="dark" />
              </View>
              <TouchableOpacity
                disabled={loading === LoadingType.FETCH}
                hitSlop={HIT_SLOP}
                style={styles.likeContainer}
                onPress={onPressLike('like')}
              >
                <AppIcon
                  name="likeFinger"
                  color={item.user_liked ? 'dark' : 'gray'}
                />
                <Text style={styles.likeCount}>{item.likes_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading === LoadingType.FETCH}
                hitSlop={HIT_SLOP}
                style={styles.likeContainer}
                onPress={onPressLike('dislike')}
              >
                <AppIcon
                  name="dislike"
                  color={item.user_disliked ? 'dark' : 'gray'}
                />
                <Text style={styles.likeCount}>{item.dislikes_count}</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </View>
    </View>
  );
};

export default CustomMusicCard;

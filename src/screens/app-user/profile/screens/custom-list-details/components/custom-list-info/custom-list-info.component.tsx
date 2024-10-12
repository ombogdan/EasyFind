import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Box } from 'shared/ui-kit/box';
import { AppIcon } from 'shared/assets';
import { HIT_SLOP, SIZE } from 'shared/constants';
import { Shadow } from 'shared/ui-kit/shadow';
import { dateFormat } from 'shared/utils/dateFormat';
import { LoadingType } from 'shared/types';
import { CustomMusicIcon } from 'shared/components/custom-music-icon';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import { useStyles } from './custom-list-info.styles';
import useCustomListInfo from './custom-list-info.hook';

const CustomListInfo = () => {
  const styles = useStyles();
  const { onPressTrack, goToMusicList, onPressLike, customItem, loading } =
    useCustomListInfo();

  return (
    <View>
      <Shadow radius={SIZE.md} />
      <View style={styles.container}>
        <Box pt={SIZE.md} direction="row">
          {/* NAME */}
          <Box flex={0.9}>
            <Text numberOfLines={2} style={styles.titleReview}>
              {customItem.name}
            </Text>
          </Box>
          {/* DATE */}
          <Box flex={0.4}>
            <Text numberOfLines={2} style={styles.date}>
              {dateFormat(customItem.create_at, 'MM.dd.yyyy')}
            </Text>
          </Box>
        </Box>
        {/* DESCRIBE */}
        <Box pt={SIZE.md}>
          <Text style={styles.textReview} numberOfLines={3}>
            {customItem.describe}
          </Text>
        </Box>
        {/* USER */}
        <Box pt={SIZE.s2m} direction="row" alignItems="center">
          {customItem.user && <ProfilePicture
            uri={customItem.user.avatar}
            width={SIZE.xl + 1}
            height={SIZE.xl + 1}
          />}
          {customItem.user && (
            <Box pl={8}>
              <Text style={styles.userName}>{customItem.user.full_name}</Text>
            </Box>
          )}
        </Box>
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
                  color={customItem.user_liked ? 'dark' : 'gray'}
                />
                <Text style={styles.likeCount}>{customItem.likes_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading === LoadingType.FETCH}
                hitSlop={HIT_SLOP}
                style={styles.likeContainer}
                onPress={onPressLike('dislike')}
              >
                <AppIcon
                  name="dislike"
                  color={customItem.user_disliked ? 'dark' : 'gray'}
                />
                <Text style={styles.likeCount}>
                  {customItem.dislikes_count}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
        <View style={styles.grayLine} />
        {/* LIST */}
        <Box mt={SIZE.md}>
          <TouchableOpacity onPress={goToMusicList} activeOpacity={0.5}>
            <Text style={styles.entryText}>
              {customItem.list_music.length}{' '}
              {customItem.list_music.length === 1 ? 'entry' : 'entries'}
            </Text>
          </TouchableOpacity>
        </Box>
        <Box direction="row" mt={SIZE.sm} style={styles.listContainer}>
          {customItem.list_music.slice(0, 8).map((i) => (
            <TouchableOpacity activeOpacity={0.5} onPress={onPressTrack(i.object_spotify.id, i.object_spotify.type_object)} key={i.id}>
              <CustomMusicIcon
                uri={i?.object_spotify?.image[0].url ?? ''}
                title={i.object_spotify.name}
                describe={i.object_spotify.artist}
              />
            </TouchableOpacity>
          ))}
        </Box>
      </View>
    </View>
  );
};

export default CustomListInfo;

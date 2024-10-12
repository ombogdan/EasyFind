import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { SIZE, BUTTON_VARIANTS } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { Shadow } from 'shared/ui-kit/shadow';
import { Activity, ActivityType, LoadingType } from 'shared/types';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useTypedDispatch } from 'shared/store';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import { useCreateFollower } from 'shared/hooks/api';
import { followUser } from 'shared/store/actions';
import { useStyles } from './activity-item.styles';
import { ActivityAction } from '../../activity.types';
import { formatTime } from '../../activity.data';
import { ActivityItemImage } from '../activity-item-image';

const ActivityButton = ({
  item,
  onPressNavigate,
  loadingFollow,
}: {
  item: Activity;
  onPressNavigate: () => void;
  loadingFollow: LoadingType;
}) => (
  <Box flex={0.4}>
    <CustomButton
      isLoading={loadingFollow === LoadingType.FETCH}
      variant={
        item?.receiver.is_followed_by_me
          ? BUTTON_VARIANTS.secondary
          : BUTTON_VARIANTS.primary
      }
      onPress={onPressNavigate}
      title={item?.receiver.is_followed_by_me ? 'Go To User' : 'Follow'}
    />
  </Box>
);

const ActivityItem = ({ item }: { item: Activity }) => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const { loading: loadingFollow, handleCreateFollower } = useCreateFollower();
  const content =
    item.event_type === ActivityType.liked_comment_review ||
    item.event_type === ActivityType.liked_comment_custom_list
      ? item.comment_review?.content || item.custom_list_comment?.content
      : '';

  const onPressNavigate = () => {
    if (item?.receiver.is_followed_by_me) {
      navigate(AppUserRoutes.PublicProfile, {
        user_id: item.receiver.id,
        username: item.receiver.username,
      });
    }
    handleCreateFollower({
      follower: item.receiver.id,
      successCallback: () => {
        dispatch(followUser(item.receiver.id));
      },
    });
  };

  const onPressItem = () => {
    if (item.review || item.comment_review || item.reply_comment_review) {
      navigate(AppUserRoutes.ViewReview, {
        reviewId: item.review?.id || item.comment_review?.object_review.id || item.reply_comment_review?.object_comment.object_review.id,
      });
      return;
    }
    if (item.custom_list || item.custom_list_comment) {
      navigate(AppUserRoutes.CustomListDetails, { item: item.custom_list || item.custom_list_comment?.list_music });
      return;
    }
    navigate(AppUserRoutes.PublicProfile, {
      user_id: item.receiver.id,
      username: item.receiver.username,
    });
  };

  const navigateToProfile = () => {
    navigate(AppUserRoutes.PublicProfile, {
      user_id: item.receiver.id,
      username: item.receiver.username,
    });
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPressItem}>
      <Shadow radius={SIZE.md} />
      <View style={styles.container}>
        <Box flex={1} direction="row" alignItems="center">
          <TouchableOpacity activeOpacity={0.5} onPress={navigateToProfile}>
          <ProfilePicture uri={item.receiver.avatar} height={56} width={56} />
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text numberOfLines={2} style={styles.albumName}>
              {item.receiver.username}
            </Text>
            <Text numberOfLines={2} ellipsizeMode={content ? 'middle' : 'clip'}>
              <Text style={styles.authorName}>
                {ActivityAction[item.event_type]}
                {content ? ` "${content}" ` : ''}
              </Text>
              <Text style={styles.time}> {formatTime(item.created_at)}</Text>
            </Text>
          </View>
        </Box>
        {item.custom_list || item.comment_review || item.custom_list_comment || item.review || item.reply_comment_review ? (
          <ActivityItemImage item={item} />
        ) : (
          <ActivityButton
            loadingFollow={loadingFollow}
            item={item}
            onPressNavigate={onPressNavigate}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ActivityItem;

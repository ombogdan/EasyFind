import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AuthData, LoadingType } from 'shared/types';
import { Shadow } from 'shared/ui-kit/shadow';
import { MediaCard } from 'shared/components/media-card';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { Box } from 'shared/ui-kit/box';
import { useTypedDispatch } from 'shared/store';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'shared/store/slices/user';
import { searchActions } from 'shared/store/slices/search';
import { useCreateFollower, useDeleteFollower } from 'shared/hooks/api';
import { useStyles } from './follower-card.styles';

interface Props {
  followCallback?: (user_id: number) => void;
  followDeleteCallback?: (user_id: number) => void;
  user: AuthData;
}

const FollowerCard = ({
  user,
  followCallback,
  followDeleteCallback,
}: Props) => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const currentUser = useSelector(userDataSelector);
  const { loading, handleCreateFollower } = useCreateFollower();
  const { loading: loadingDelete, handleDeleteFollower } = useDeleteFollower();

  const isLoading =
    loadingDelete === LoadingType.FETCH || loading === LoadingType.FETCH;

  const onPressUser = (user_id: number, username: string) => () => {
    navigate(AppUserRoutes.PublicProfile, { user_id, username });
  };

  const onPressFollow = () => {
    handleCreateFollower({
      follower: user.id,
      successCallback: (user_id) => {
        if (followCallback) {
          followCallback(user_id);
        }
        dispatch(
          searchActions.updateUserFollow({ user_id, is_followed_by_me: true }),
        );
      },
    });
  };

  const onPressDeleteFollower = () => {
    handleDeleteFollower({
      author_id: user.id,
      successCallback: (user_id) => {
        if (followDeleteCallback) {
          followDeleteCallback(user_id);
        }
        dispatch(
          searchActions.updateUserFollow({ user_id, is_followed_by_me: false }),
        );
      },
    });
  };

  return (
    <TouchableOpacity
      disabled={currentUser?.id === user.id}
      activeOpacity={0.5}
      onPress={onPressUser(user.id, user.username)}
      key={user.id}
    >
      <Shadow radius={SIZE.md} />
      <View style={styles.cardContainer}>
        <Box flex={1}>
          <MediaCard
            is_user
            uri={user.avatar}
            name={user.full_name}
            title={`@${user.username}`}
          />
        </Box>
        {/* BUTTON */}
        {currentUser?.id !== user.id && (
          <Box flex={0.4}>
            <CustomButton
              isLoading={isLoading}
              variant={
                user.is_followed_by_me
                  ? BUTTON_VARIANTS.secondary
                  : BUTTON_VARIANTS.primary
              }
              title={user.is_followed_by_me ? 'Following' : 'Follow'}
              onPress={() => {
                if (user.is_followed_by_me) {
                  onPressDeleteFollower();
                } else {
                  onPressFollow();
                }
              }}
            />
          </Box>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FollowerCard;

import React, { useState } from 'react';
import { Linking } from 'react-native';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { navigate } from 'shared/navigation/root-navigator.config';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'shared/store/slices/user';
import {
  useCreateFollower,
  useDeleteFollower,
  useFetchUserInfo,
  useFetchUserStats,
} from 'shared/hooks/api';
import { showToast } from 'shared/utils/show-toast';
import {
  useFocusEffect,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { useTypedDispatch } from 'shared/store';
import { searchActions } from 'shared/store/slices/search';
import { AuthData, FollowerParamActionType, LoadingType } from 'shared/types';
import { Props } from './profile-header.types';

const useProfileHeader = ({ public_user_id, username }: Props) => {
  const navigation = useNavigation();
  const user = useSelector(userDataSelector);
  const { stats, fetchUserStats } = useFetchUserStats();
  const { fetchUserInfo } = useFetchUserInfo();
  const [userInfo, setUserInfo] = useState<AuthData>();

  const dispatch = useTypedDispatch();
  const { loading: loadingFollow, handleCreateFollower } = useCreateFollower();
  const { loading: loadingDelete, handleDeleteFollower } = useDeleteFollower();

  useFocusEffect(
    React.useCallback(() => {
      fetchUserStats(public_user_id ?? user?.id ?? 0);
      if (public_user_id) {
        fetchUserInfo(public_user_id, (data) => setUserInfo(data));
      }
    }, [user, public_user_id]),
  );

  const currentUser = public_user_id ? userInfo : user;
  const isLoading =
    loadingDelete === LoadingType.FETCH || loadingFollow === LoadingType.FETCH;

  const onPressLink = () => {
    if (!user?.instagram_link || !Linking.canOpenURL(user?.instagram_link)) {
      showToast({
        type: 'error',
        text1: 'Can not open the link',
      });
      return;
    }
    Linking.openURL(user?.instagram_link);
  };

  const handlePressEditProfile = () => {
    navigate(AppUserRoutes.EditProfile);
  };

  const onPressFollowers = (action: FollowerParamActionType) => () => {
    const pushAction = StackActions.push(AppUserRoutes.Followers, {
      user_id: public_user_id ?? user?.id,
      username: username ?? currentUser?.username,
      action,
    });
    navigation.dispatch(pushAction);
  };

  const handleFollowUser = () => {
    if (!userInfo || !public_user_id || isLoading) return;
    handleCreateFollower({
      follower: userInfo.id,
      successCallback: (user_id) => {
        setUserInfo({
          ...userInfo,
          is_followed_by_me: true,
        });
        fetchUserStats(public_user_id ?? user?.id ?? 0);
        dispatch(
          searchActions.updateUserFollow({ user_id, is_followed_by_me: true }),
        );
      },
    });
  };

  const handleDeleteFollowUser = () => {
    if (!userInfo || !public_user_id || isLoading) return;
    handleDeleteFollower({
      author_id: userInfo.id,
      successCallback: (user_id) => {
        setUserInfo({
          ...userInfo,
          is_followed_by_me: false,
        });
        fetchUserStats(public_user_id ?? user?.id ?? 0);
        dispatch(
          searchActions.updateUserFollow({ user_id, is_followed_by_me: false }),
        );
      },
    });
  };

  const onPressFollow = () => {
    if (userInfo?.is_followed_by_me) {
      handleDeleteFollowUser();
      return;
    }
    handleFollowUser();
  };

  return {
    onPressFollow,
    onPressFollowers,
    handlePressEditProfile,
    onPressLink,
    stats,
    currentUser,
    isLoading,
  };
};

export default useProfileHeader;

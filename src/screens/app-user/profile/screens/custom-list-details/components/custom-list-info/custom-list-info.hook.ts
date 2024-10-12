import React, { useState } from 'react';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import {
  useFetchCustomMusicById,
  useUpdateCustomMusicLike,
} from 'shared/hooks/api';
import { CustomMusicList, SpotifyMediaType } from 'shared/types';
import { useTypedDispatch } from 'shared/store';
import { useFocusEffect } from '@react-navigation/native';
import { profileActions } from 'shared/store/slices/profile';
import { navigate } from 'shared/navigation/root-navigator.config';

const useCustomListInfo = () => {
  const { params } = useAppRoute<AppUserRoutes.CustomListDetails>();
  const { item } = params;
  const { loading, setCustomMusicLike } = useUpdateCustomMusicLike();
  const { fetchCustomMusicById } = useFetchCustomMusicById();
  const dispatch = useTypedDispatch();
  const [customItem, setCustomItem] = useState<CustomMusicList>(item);

  useFocusEffect(
    React.useCallback(() => {
      fetchCustomMusicById({ id: item.id, successCallback: setCustomItem });
    }, [item]),
  );

  const onPressLike = (variant: 'like' | 'dislike') => () => {
    const isLike = variant === 'like';
    const userKey = isLike ? 'user_liked' : 'user_disliked';
    const countKey = isLike ? 'likes_count' : 'dislikes_count';

    const updatedItem = {
      ...customItem,
      [userKey]: !customItem[userKey],
      [countKey]: customItem[userKey]
        ? customItem[countKey] - 1
        : customItem[countKey] + 1,
      ...(isLike && {
        user_disliked: customItem.user_disliked
          ? false
          : customItem.user_disliked,
        dislikes_count: customItem.user_disliked
          ? customItem.dislikes_count - 1
          : customItem.dislikes_count,
      }),
      ...(!isLike && {
        user_liked: customItem.user_liked ? false : customItem.user_liked,
        likes_count: customItem.user_liked
          ? customItem.likes_count - 1
          : customItem.likes_count,
      }),
    };

    setCustomMusicLike({
      id: customItem.id,
      successCallback: () => setCustomItem(updatedItem),
      like: isLike,
    });
  };

  const goToMusicList = () => {
    dispatch(profileActions.setSelectedMusicList(customItem.list_music));
    dispatch(profileActions.setCustomListUpdateId(item.id));
    navigate(AppUserRoutes.CustomListMusic, {user_id: customItem.user?.id});
  };

  const onPressTrack = (id: string, type: SpotifyMediaType) => () => {
    console.log(id, type);
    switch (type) {
      case 'albums':
        navigate(AppUserRoutes.TrackDetail, { id });
        break;
      case 'tracks':
        navigate(AppUserRoutes.TrackDetail, { id, isTrack: true });
        break;
      default:
        break;
    }
  }

  return { onPressTrack, goToMusicList, onPressLike, customItem, loading };
};

export default useCustomListInfo;

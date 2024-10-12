import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  useFetchFavoriteMusic,
  useGetActivity,
  useGetMusicList,
  useGetUserReviewsRating,
} from 'shared/hooks/api';
import { CustomMusicList, SpotifyMediaType } from 'shared/types';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { navigate } from 'shared/navigation/root-navigator.config';

const useHomeTab = ({user_id, onLoading}: { user_id?: number, onLoading: () => void }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [pinnedItem, setPinnedItem] = useState<CustomMusicList[]>([]);

  const { fetchActivity, activity } = useGetActivity(user_id);
  const { fetchRating, rating } = useGetUserReviewsRating(user_id);
  const { fetchFavoriteMusic, favorite_music } = useFetchFavoriteMusic(user_id);
  const { fetchMusicList } = useGetMusicList();

  useFocusEffect(
    React.useCallback(() => {
      fetchRating();
      fetchActivity();
      fetchMusicList({
        successCallback: (data) => {
          setPinnedItem(data.results);
        },
        user_id,
        is_me: user_id ? undefined : true,
        is_pinned: true,
        limit: 1,
        offset: 0,
      });
      fetchFavoriteMusic(() => {
        onLoading();
        setLoadingData(false);
      });
    }, [user_id]),
  );

  const handleUpdate = (item: CustomMusicList) => {
    setPinnedItem([item]);
  };

  const navigateToList = () => {
    navigate(AppUserRoutes.PinnedList, { public_user_id: user_id });
  };

  const navigateToListDetails = () => {
    navigate(AppUserRoutes.CustomListDetails, {
      item: pinnedItem[0],
    });
  };

  const onPressActivity = (id: string, type: SpotifyMediaType) => () => {
    switch (type) {
      case 'albums':
        navigate(AppUserRoutes.TrackDetail, { id });
        break;
      case 'artists':
        navigate(AppUserRoutes.ArtistDetail, { id });
        break;
      case 'tracks':
        navigate(AppUserRoutes.TrackDetail, { id, isTrack: true });
        break;
      default:
        break;
    }
  };

  const onPressAlbum = (id: string) => () => {
    navigate(AppUserRoutes.TrackDetail, { id });
  };

  return {
    onPressAlbum,
    onPressActivity,
    activity,
    favorite_music,
    rating,
    loadingData,
    navigateToList,
    navigateToListDetails,
    handleUpdate,
    pinnedItem,
  };
};

export default useHomeTab;

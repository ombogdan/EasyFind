import { useState } from 'react';
import { getFavoriteMusic } from 'shared/core/services/api/user/user';
import { CustomMusicTrack, LoadingType } from 'shared/types';

const useFetchFavoriteMusic = (user_id?: number) => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [favorite_music, setFavorite] = useState<CustomMusicTrack[]>([]);

  const fetchFavoriteMusic = async (successCallback?: (data: CustomMusicTrack[]) => void) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getFavoriteMusic(user_id);
      setFavorite(data as CustomMusicTrack[]);
      if (successCallback) {
        successCallback(data as CustomMusicTrack[]);
      }
      return data as CustomMusicTrack[];
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchFavoriteMusic, favorite_music };
};

export default useFetchFavoriteMusic;

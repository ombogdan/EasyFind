import { useState } from 'react';
import { updateFavoriteMusic } from 'shared/core/services/api/user/user';
import { CustomMusicTrack, LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: CustomMusicTrack[]) => void;
  props: CustomMusicTrack[];
}

const useUpdateFavoriteMusic = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const editFavoriteMusic = async ({ successCallback, props }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await updateFavoriteMusic(props);
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

  return { loading, editFavoriteMusic };
};

export default useUpdateFavoriteMusic;

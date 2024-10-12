import { useState } from 'react';
import { updateCustomMusicLike } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: any) => void;
  id: number;
  like: boolean;
}

const useUpdateCustomMusicLike = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const setCustomMusicLike = async ({ successCallback, like, id }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await updateCustomMusicLike(id, like);
      if (successCallback) {
        successCallback(data);
      }
      return data;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, setCustomMusicLike };
};

export default useUpdateCustomMusicLike;

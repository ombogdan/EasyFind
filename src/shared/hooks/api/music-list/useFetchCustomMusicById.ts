import { useState } from 'react';
import { getCustomMusicById } from 'shared/core/services/api/user/user';
import { CustomMusicList, LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: CustomMusicList) => void;
  id: number;
}

const useFetchCustomMusicById = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const fetchCustomMusicById = async ({ successCallback, id }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getCustomMusicById(id);
      if (successCallback) {
        successCallback(data as CustomMusicList);
      }
      return data as CustomMusicList;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchCustomMusicById };
};

export default useFetchCustomMusicById;

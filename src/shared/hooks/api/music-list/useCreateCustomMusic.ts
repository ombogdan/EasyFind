import { useState } from 'react';
import { createCustomMusic } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: any) => void;
  props: {
    name: string,
    describe: string,
    make_public: boolean,
    pinned: boolean,
  }
}

const useCreateCustomMusic = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const addMusicList = async ({ successCallback, props }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await createCustomMusic(props);
      console.log('data', data);
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

  return { loading, addMusicList };
};

export default useCreateCustomMusic;

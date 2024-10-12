import { useState } from 'react';
import { updateCustomMusic } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: any) => void;
  id: number;
  props: {
    name: string,
    describe: string,
    make_public: boolean,
    pinned: boolean,
  }
}

const useUpdateCustomMusic = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const editMusicList = async ({ successCallback, props, id }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await updateCustomMusic(id, props);
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

  return { loading, editMusicList };
};

export default useUpdateCustomMusic;

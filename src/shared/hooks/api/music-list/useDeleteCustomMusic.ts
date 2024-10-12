import { useState } from 'react';
import { deleteCustomMusic } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: (id: number) => void;
  id: number;
}

const useDeleteCustomMusic = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const removeCustomMusic = async ({ successCallback, id }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      await deleteCustomMusic(id);
      if (successCallback) {
        console.log('successCallback');
        successCallback(id);
      }
      return id;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, removeCustomMusic };
};

export default useDeleteCustomMusic;

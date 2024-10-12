import { useState } from 'react';
import { deleteUserAvatar } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

const useDeleteAvatar = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const deleteAvatar = async (successCallback?: () => void) => {
    setLoading(LoadingType.FETCH);
    try {
      await deleteUserAvatar();
      if (successCallback) {
        successCallback();
      }
      return true;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, deleteAvatar };
};

export default useDeleteAvatar;

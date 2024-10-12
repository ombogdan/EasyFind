import { useState } from 'react';
import { addUserAvatar } from 'shared/core/services/api/user/user';
import { AuthData, LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: AuthData) => void;
  avatar: FormData;
}

const useUpdateAvatar = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const updateAvatar = async ({ successCallback, avatar }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await addUserAvatar(avatar);
      if (successCallback) {
        successCallback(data as AuthData);
      }
      return data as AuthData;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, updateAvatar };
};

export default useUpdateAvatar;

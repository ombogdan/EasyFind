import { useState } from 'react';
import { getUserInfo } from 'shared/core/services/api/user/user';
import { AuthData, LoadingType } from 'shared/types';

const useFetchUserInfo = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const fetchUserInfo = async (
    user_id: number,
    successCallback?: (data: AuthData) => void,
  ) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getUserInfo(user_id);
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

  return { loading, fetchUserInfo };
};

export default useFetchUserInfo;

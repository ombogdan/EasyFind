import { useState } from 'react';
import { getUserProfile } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

const useFetchProfile = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const fetchProfile = async (successCallback?: (data: any) => void) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getUserProfile();
      if (successCallback) {
        successCallback(data);
      }
      return data
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchProfile };
};

export default useFetchProfile;

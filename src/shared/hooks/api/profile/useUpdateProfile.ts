import { useState } from 'react';
import { updateUserProfile } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: () => void;
  params: {
    username: string;
    full_name: string;
    bio: string;
    instagram_link: string;
  };
}

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const updateProfile = async ({ successCallback, params }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await updateUserProfile(params);
      if (successCallback) {
        successCallback();
      }
      return data
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, updateProfile };
};

export default useUpdateProfile;

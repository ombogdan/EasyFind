import { useState } from 'react';
import { updateUserPassword } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';
import { showToast } from 'shared/utils/show-toast';

interface Params {
  successCallback?: () => void;
  data: {
    password: string;
    new_password: string;
    new_password_confirm: string;
  };
}

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const updatePassword = async ({
    successCallback,
    data,
  }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      await updateUserPassword(data);
      if (successCallback) {
        successCallback();
      }
    } catch (error: any) {
      if (Array.isArray(error?.response?.data)) {
        showToast({
          type: 'error',
          text1: error?.response?.data[0]
        })
      }
      console.log('error', {...error});
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, updatePassword };
};

export default useUpdatePassword;

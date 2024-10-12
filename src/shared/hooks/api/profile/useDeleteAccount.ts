import { useState } from 'react';
import { deleteAccount } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: () => void;
}

const useDeleteAccount = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const handleDeleteAccount = async ({ successCallback }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      await deleteAccount();
      if (successCallback) {
        successCallback();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, handleDeleteAccount };
};

export default useDeleteAccount;

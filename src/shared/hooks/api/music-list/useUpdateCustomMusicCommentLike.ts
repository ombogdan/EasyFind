import { useState } from 'react';
import { updateCustomMusicCommentLike } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: () => void;
  props: {
    id: number;
    comment_id: number;
    like: boolean;
  };
}

const useUpdateCustomMusicCommentLike = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const updateCommentLike = async ({ successCallback, props }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      await updateCustomMusicCommentLike(props);
      if (successCallback) {
        successCallback();
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, updateCommentLike };
};

export default useUpdateCustomMusicCommentLike;

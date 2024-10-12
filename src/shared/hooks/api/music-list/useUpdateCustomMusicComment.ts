import { useState } from 'react';
import { updateCustomMusicComment } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: any) => void;
  props: {
    id: number;
    comment_id: number;
    content: string;
  };
}

const useUpdateCustomMusicComment = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const updateComment = async ({ successCallback, props }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await updateCustomMusicComment(props);
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

  return { loading, updateComment };
};

export default useUpdateCustomMusicComment;

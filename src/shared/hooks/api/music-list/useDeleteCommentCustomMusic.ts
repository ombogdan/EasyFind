import { useState } from 'react';
import { deleteCustomMusicComment } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: (comment_id: number) => void;
  props: {
    id: number;
    comment_id: number;
  };
}

const useDeleteCommentCustomMusic = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const deleteComment = async ({ successCallback, props }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      await deleteCustomMusicComment(props.id, props.comment_id);
      if (successCallback) {
        successCallback(props.comment_id);
      }
      return props.comment_id;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, deleteComment };
};

export default useDeleteCommentCustomMusic;

import { useState } from 'react';
import { createCustomMusicComment } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: any) => void;
  props: {
    id: number;
    list_music: number; // list_music === id
    user: number;
    content: string;
    parent: number | null;
  };
}

const useCreateCustomMusicComments = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const createComment = async ({ successCallback, props }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await createCustomMusicComment(props.id, props);
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

  return { loading, createComment };
};

export default useCreateCustomMusicComments;

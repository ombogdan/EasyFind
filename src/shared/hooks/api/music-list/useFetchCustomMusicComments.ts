import { useState } from 'react';
import { getCustomMusicComments } from 'shared/core/services/api/user/user';
import { CustomMusicListComment, LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: Response) => void;
  loading_type?: LoadingType;
  offset?: number;
  limit?: number;
  id: number;
}

interface Response {
  results: CustomMusicListComment[];
  count: number;
}

const useFetchCustomMusicComments = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const fetchComments = async ({
    successCallback,
    limit,
    offset,
    loading_type,
    id,
  }: Params) => {
    setLoading(loading_type ?? LoadingType.FETCH);
    try {
      const { data } = await getCustomMusicComments(id, {
        limit: limit ?? 5,
        offset: offset ?? 0,
      });
      if (successCallback) {
        successCallback(data as Response);
      }
      return data as Response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchComments };
};

export default useFetchCustomMusicComments;

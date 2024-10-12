import { useState } from 'react';
import { getFollowers } from 'shared/core/services/api/user/user';
import { AuthData, LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: Response) => void;
  loading_type?: LoadingType;
  offset?: number;
  limit?: number;
  user_id: number;
}

interface Response {
  results: AuthData[];
  count: number;
}

const useFetchFollowers = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const fetchFollowers = async ({
    successCallback,
    limit,
    offset,
    user_id,
    loading_type
  }: Params) => {
    setLoading(loading_type ?? LoadingType.FETCH);
    try {
      const { data } = await getFollowers(user_id, {
        limit: limit ?? 10,
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

  return { loading, fetchFollowers };
};

export default useFetchFollowers;

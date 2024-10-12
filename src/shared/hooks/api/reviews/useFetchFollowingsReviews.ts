import { useState } from 'react';
import { getFollowingsReviews } from 'shared/core/services/api/user/user';
import { LoadingType, ReviewType } from 'shared/types';

interface Params {
  successCallback?: (data: Response) => void;
  limit?: number;
  offset?: number;
}

interface Response {
  count: number;
  results: ReviewType[];
}

const useFetchFollowingsReviews = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const fetchFollowingsReviews = async ({
    successCallback,
    limit,
    offset,
  }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getFollowingsReviews({
        offset: offset || 0,
        limit: limit || 10,
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

  return { loading, fetchFollowingsReviews };
};

export default useFetchFollowingsReviews;

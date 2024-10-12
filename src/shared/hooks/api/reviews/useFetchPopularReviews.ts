import { useState } from 'react';
import { getPopularReviews } from 'shared/core/services/api/user/user';
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

const useFetchPopularReviews = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const fetchPopularReviews = async ({
    successCallback,
    limit,
    offset,
  }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getPopularReviews({
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

  return { loading, fetchPopularReviews };
};

export default useFetchPopularReviews;

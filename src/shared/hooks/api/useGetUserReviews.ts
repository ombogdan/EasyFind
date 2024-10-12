import { useState } from 'react';
import {
  getUserReviewsByUserId,
} from 'shared/core/services/api/user/user';
import { LoadingType, ReviewType } from 'shared/types';

interface Props {
  loading_type?: LoadingType;
  offset?: number;
  limit?: number;
  user_id: number;
  successCallback: (items: Response) => void;
}

type Response = {
  count: number;
  results: ReviewType[];
}

const useGetUserReviews = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [total, setTotal] = useState(0);

  const fetchUserReviews = async (props: Props) => {
    setLoading(props.loading_type ?? LoadingType.FETCH);
    try {
      const { data } = await getUserReviewsByUserId({
        limit: props.limit || 10,
        offset: props.offset ?? 0,
        user_id: props.user_id,
      });
      setTotal((data as Response).count);
      props?.successCallback(data as Response);
      return data as Response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  const fetchMoreUserReviews = async (props: Props) => {
    setLoading(props.loading_type ?? LoadingType.FETCH_MORE);
    try {
      const { data } = await getUserReviewsByUserId({
        limit: 10,
        offset: props.offset ?? 0,
        user_id: props.user_id,
      });
      setTotal((data as Response).count);
      props?.successCallback(data as Response);
      return data as Response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, total, fetchUserReviews, fetchMoreUserReviews };
};

export default useGetUserReviews;

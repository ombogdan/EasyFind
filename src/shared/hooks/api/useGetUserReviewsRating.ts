import { useState } from 'react';
import { getUserReviewRating } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

const useGetUserReviewsRating = (user_id?: number) => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [rating, setRating] = useState<number[]>([]);

  const fetchRating = async () => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getUserReviewRating(user_id);
      setRating(data.ratings);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchRating, rating };
};

export default useGetUserReviewsRating;

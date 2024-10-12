import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useGetUserReviews } from 'shared/hooks/api';
import { ReviewType } from 'shared/types';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'shared/store/slices/user';

const useReviewTab = (user_id?: number) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [limit, setLimit] = useState(10);
  const currentUser = useSelector(userDataSelector);
  const { loading, total, fetchUserReviews, fetchMoreUserReviews } =
    useGetUserReviews();

  useFocusEffect(
    React.useCallback(() => {
      fetchUserReviews({
        user_id: user_id ?? currentUser?.id ?? 0,
        successCallback: (data) => setReviews(data.results),
        limit,
      });
    }, [user_id, currentUser, limit]),
  );

  const handleUpdateReview = (item: ReviewType) => {
    setReviews((prev) =>
      prev.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            ...item,
          };
        }
        return i;
      }),
    );
  };

  const onPressLoadMore = async () => {
    fetchMoreUserReviews({
      user_id: user_id ?? currentUser?.id ?? 0,
      offset: reviews.length,
      successCallback: (data) => {
        setLimit([...reviews, ...data.results].length);
        setReviews((prev) => [...prev, ...data.results]);
      },
    });
  };

  return { onPressLoadMore, handleUpdateReview, loading, total, reviews };
};

export default useReviewTab;

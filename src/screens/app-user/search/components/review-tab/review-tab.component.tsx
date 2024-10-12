import { View } from 'react-native';
import React from 'react';
import { ReviewType, SearchTab } from 'shared/types';
import { ReviewFullCard } from 'shared/components/review-full-card';
import { useSelector } from 'react-redux';
import {
  searchActions,
  searchActiveTabSelector,
  searchReviewResultSelector,
  searchReviewsSelector,
} from 'shared/store/slices/search';
import { useTypedDispatch } from 'shared/store';
import { useStyles } from './review-tab.styles';
import { SearchEmpty } from '../search-empty';

const ReviewTab = () => {
  const styles = useStyles();
  const reviewList = useSelector(searchReviewsSelector);
  const active_tab = useSelector(searchActiveTabSelector);
  const is_empty_result = useSelector(searchReviewResultSelector);
  const dispatch = useTypedDispatch();

  const handleUpdateReview = (item: ReviewType) => {
    dispatch(searchActions.updateReview(item));
  };

  if (active_tab !== SearchTab.REVIEWS) {
    return null;
  }

  return (
    <View style={styles.container}>
      {reviewList.map((i) => (
        <ReviewFullCard
          key={i.id}
          review={i}
          handleUpdateReview={handleUpdateReview}
        />
      ))}
       {is_empty_result && <SearchEmpty />}
    </View>
  );
};

export default ReviewTab;

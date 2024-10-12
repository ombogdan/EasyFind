import { View } from 'react-native';
import React, { useState } from 'react';
import { Title } from 'shared/ui-kit/title';
import { Box } from 'shared/ui-kit/box';
import { SIZE } from 'shared/constants';
import {
  useFetchFollowingsReviews,
  useFetchPopularReviews,
} from 'shared/hooks/api';
import { ReviewType } from 'shared/types';
import { ReviewFullCard } from 'shared/components/review-full-card';
import { Tabs } from 'shared/components/tabs';
import { useFocusEffect } from '@react-navigation/native';

enum ReviewTabType {
  POPULAR = 'Popular',
  FRIENDS = 'Friends',
}

const ReviewTabs = [
  { key: ReviewTabType.POPULAR, label: ReviewTabType.POPULAR },
  { key: ReviewTabType.FRIENDS, label: ReviewTabType.FRIENDS },
];

const TimelineReviews = () => {
  const [reviewList, setReviewList] = useState<ReviewType[]>([]);
  const [followingReviews, setFollowingReviews] = useState<ReviewType[]>([]);
  const [activeTab, setActiveTab] = useState(ReviewTabType.POPULAR);

  const { fetchPopularReviews } = useFetchPopularReviews();
  const { fetchFollowingsReviews } = useFetchFollowingsReviews();

  useFocusEffect(
    React.useCallback(() => {
      fetchPopularReviews({
        limit: 3,
        successCallback: (data) => setReviewList(data.results),
      });
      fetchFollowingsReviews({
        limit: 3,
        successCallback: (data) => setFollowingReviews(data.results),
      });
    }, []),
  );

  const handleUpdateItem = (item: ReviewType) => {
    setReviewList((prev) =>
      prev.map((i) => {
        if (i.id !== item.id) {
          return i;
        }
        return item;
      }),
    );
  };

  const handleUpdateFollowingItem = (item: ReviewType) => {
    setFollowingReviews((prev) =>
      prev.map((i) => {
        if (i.id !== item.id) {
          return i;
        }
        return item;
      }),
    );
  };

  const onChangeTab = (key: string | number) => {
    setActiveTab(key as ReviewTabType);
  };

  return (
    <View>
      <Box mt={SIZE.xl} ml={SIZE.md} mr={SIZE.md}>
        <Title text="Timeline Reviews" />
        <Box mt={SIZE.md}>
          <Tabs
            handlePressTab={onChangeTab}
            active_tab={activeTab}
            actions={ReviewTabs}
          />
        </Box>
        {activeTab === ReviewTabType.POPULAR && (
          <View
            style={{
              marginTop: SIZE.md,
              gap: SIZE.md,
            }}
          >
            {reviewList.map((review) => (
              <ReviewFullCard
                key={review.id}
                review={review}
                handleUpdateReview={handleUpdateItem}
              />
            ))}
          </View>
        )}
        {activeTab === ReviewTabType.FRIENDS && (
          <View
            style={{
              marginTop: SIZE.md,
              gap: SIZE.md,
            }}
          >
            {followingReviews.map((review) => (
              <ReviewFullCard
                key={review.id}
                review={review}
                handleUpdateReview={handleUpdateFollowingItem}
              />
            ))}
          </View>
        )}
      </Box>
    </View>
  );
};

export default TimelineReviews;

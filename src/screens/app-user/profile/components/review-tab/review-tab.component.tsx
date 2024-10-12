import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LOTTIE_BLACK_LOADER, SIZE } from 'shared/constants';
import { ReviewFullCard } from 'shared/components/review-full-card';
import { Box } from 'shared/ui-kit/box';
import { LoadingType } from 'shared/types';
import LottieView from 'lottie-react-native';
import { useStyles } from './review-tab.styles';
import TabLoading from '../tab-loading';
import useReviewTab from './review-tab.hook';

const ReviewTab = ({user_id}: {user_id?: number}) => {
  const styles = useStyles();
  const { onPressLoadMore, handleUpdateReview, loading, total, reviews } =
    useReviewTab(user_id);

  if (loading === LoadingType.FETCH && !reviews.length) {
    return <TabLoading />;
  }

  return (
    <View style={styles.container}>
      <Box pt={SIZE.x3l} />
      {/* REVIEW LIST */}
      {reviews.map((review) => (
        <Box mb={SIZE.md} key={review.id}>
          <ReviewFullCard
            review={review}
            handleUpdateReview={handleUpdateReview}
          />
        </Box>
      ))}
      {/* LOAD MORE */}
      {loading === LoadingType.COMPLETE && reviews.length !== total && (
        <Box mt={16}>
          <TouchableOpacity activeOpacity={0.5} onPress={onPressLoadMore}>
            <Text style={styles.loadMoreText}>View more Reviews</Text>
          </TouchableOpacity>
        </Box>
      )}
      {loading === LoadingType.FETCH_MORE && (
        <Box alignItems="center">
          <LottieView
            style={{
              height: 150,
              width: 150,
            }}
            source={LOTTIE_BLACK_LOADER}
            autoPlay
            loop
          />
        </Box>
      )}
    </View>
  );
};

export default ReviewTab;

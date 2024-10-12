import { SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header } from 'shared/components/header';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { LoadingType, ReviewType } from 'shared/types';
import { useFetchReviewsByMusicId } from 'shared/hooks/api';
import { ReviewItem } from 'shared/components/review-item';
import { SIZE } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { LoadingIndicator } from './components/loading-indicator';
import { useStyles } from './track-review-list.styles';

const TrackReviewList = () => {
  const styles = useStyles();
  const { params } = useAppRoute<AppUserRoutes.TrackReviewList>();
  const { fetchReviewsByMusicId, loading, total } = useFetchReviewsByMusicId();
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    fetchReviewsByMusicId({
      successCallback: (res) => {
        setReviews(res.data);
      },
      type: params.type,
      id: params.music_id,
      limit: 10,
    });
  }, [params]);

  const loadMoreReview = () => {
    if (
      total === 0 ||
      loading !== LoadingType.COMPLETE ||
      total === reviews.length
    )
      return;
    fetchReviewsByMusicId({
      successCallback: (res) => {
        setReviews([...reviews, ...res.data]);
      },
      type: params.type,
      id: params.music_id,
      limit: 10,
      offset: reviews.length,
      loadingType: LoadingType.FETCH_MORE,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header name="All Reviews" backButton />
      {loading === LoadingType.FETCH && <LoadingIndicator size={150} />}
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreReview}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          loading === LoadingType.FETCH_MORE ? (
            <Box mt={SIZE.md}>
              <LoadingIndicator size={150} />
            </Box>
          ) : null
        }
        keyExtractor={(item) => item.id.toLocaleString()}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    </SafeAreaView>
  );
};

export default TrackReviewList;

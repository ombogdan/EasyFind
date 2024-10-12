import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Header } from 'components/header';
import { Box } from 'ui-kit/box';
import CustomInput from 'ui-kit/custom-input/custom-input.component';
import { getMyReview, saveReview, updateReview } from 'services/api/user/user';
import { AlbumTile } from 'screens/app-user/search/components/album-tile';
import { goBack } from 'shared/navigation/root-navigator.config';
import { RateTrackProps } from './rate-track.types';
import { useStyles } from './rate-track.styles';
import RateStars from './components/rate-stars/rate-stars.component';

type RateTrackTypes = {
  route: { params: RateTrackProps };
};
const RateTrack = ({ route }: RateTrackTypes) => {
  const styles = useStyles();
  const { id, type, reviewItem } = route.params;
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [loadingReview, setLoadingReview] = useState(false);

  const label = loadingReview ? '' : reviewId ? 'Edit Review' : 'Add Review';

  const handleGetMyReview = async () => {
    try {
      setLoadingReview(true);
      const { data } = await getMyReview(id, type);
      const { text, title: newTitle, rate, id: newId } = data.data[0] ?? {};
      setRating(rate);
      setTitle(newTitle);
      setReview(text);
      setReviewId(newId);
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    } finally {
      setLoadingReview(false);
    }
  };

  useEffect(() => {
    handleGetMyReview();
  }, [id]);

  const handlePressLeftButton = async () => {
    try {
      if (!rating && !title && !review) {
        return;
      }
      setIsLoading(true);
      if (!reviewId) {
        await saveReview(id, type, {
          rate: rating,
          title,
          text: review,
        });
      } else {
        await updateReview(reviewId, {
          rate: rating,
          title,
          text: review,
        });
      }
      goBack();
      setIsLoading(false);
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIsLoading={isLoading}
        backButtonText="Cancel"
        leftButtonText="Publish"
        onPressLeftButton={handlePressLeftButton}
        name={label}
      />
      <Box pl={16} pr={16}>
        <Box pt={16} justifyContent="space-between" direction="row">
          <Text style={styles.titleText}>Date</Text>
          <Text style={styles.dateText}>September 09, 2022</Text>
        </Box>
        <Box pt={8} pb={8}>
          <AlbumTile album={reviewItem} index={0} review />
        </Box>
        <RateStars rating={rating} onChangeRating={setRating} />
        <Box pt={24}>
          <Text style={styles.titleText}>Leave a review</Text>
          <Box pt={8}>
            <CustomInput
              value={title}
              onChangeValue={(newTitle) => {
                setTitle(newTitle);
              }}
              styleContainer={styles.reviewInputContainer}
              maxLength={100}
              placeholder="Title"
            />
          </Box>
          <Box pt={8}>
            <CustomInput
              value={review}
              onChangeValue={(newTitle) => {
                setReview(newTitle);
              }}
              multiline
              styleInput={styles.reviewInput}
              maxLength={1024}
              placeholder="Add a review"
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default RateTrack;

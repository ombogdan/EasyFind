import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RateStars } from 'screens/app-user/rate-track/components/rate-stars';
import { AppIcon } from 'shared/assets';
import { MediaCard } from 'shared/components/media-card';
import { HIT_SLOP, SIZE } from 'shared/constants';
import { changeLike } from 'shared/core/services/api/user/user';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { navigate } from 'shared/navigation/root-navigator.config';
import { userDataSelector } from 'shared/store/slices/user';
import { Box } from 'shared/ui-kit/box';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import { Shadow } from 'shared/ui-kit/shadow';
import { useStyles } from './review-full-card.styles';
import { Props } from './review-full-card.types';

const ReviewFullCard = ({ review, handleUpdateReview }: Props) => {
  const styles = useStyles();
  const currentUser = useSelector(userDataSelector);
  const [loadingLike, setLoadingLike] = useState(false);

  const goToReview = () => {
    navigate(AppUserRoutes.ViewReview, { reviewId: review.id });
  };

  const goToUserProfile = (user_id: number) => () => {
    navigate(AppUserRoutes.PublicProfile, { user_id });
  };

  const handlePressLike = async () => {
    try {
      setLoadingLike(true);
      const { user_liked, user_disliked } = review;
      handleUpdateReview({
        ...review,
        like: !user_liked ? review.like + 1 : review.like - 1,
        user_liked: !user_liked,
        user_disliked: false,
        dislike: user_disliked ? review.dislike - 1 : review.dislike,
      });
      await changeLike(review.id, { like: user_liked ? null : true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLike(false);
    }
  };

  const handlePressDislike = async () => {
    try {
      setLoadingLike(true);
      const { user_disliked, user_liked } = review;
      handleUpdateReview({
        ...review,
        dislike: !user_disliked ? review.dislike + 1 : review.dislike - 1,
        user_disliked: !user_disliked,
        user_liked: false,
        like: user_liked ? review.like - 1 : review.like,
      });
      await changeLike(review.id, { like: user_disliked ? null : false });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={goToReview}>
      <Shadow radius={16} />
      <View style={styles.container}>
        <Box mr={4}>
          {/* MEDIA HEADER */}
          <MediaCard
            title={review.object_spotify?.artist}
            name={review.object_spotify.name}
            type={review.object_spotify?.type_object || ''}
            uri={review.object_spotify?.image[0].url || ''}
          />
        </Box>
        <Box pt={SIZE.md}>
          <Text style={styles.titleReview}>{review.title}</Text>
        </Box>
        {/* STARS */}
        <Box pt={SIZE.sm}>
          <RateStars rating={review.rate} iconSize={18} />
        </Box>
        <Box pt={SIZE.md}>
          <Text style={styles.textReview} numberOfLines={3}>
            {review.text}
          </Text>
        </Box>
        {/* USER */}
        <TouchableOpacity
          disabled={currentUser?.id === review.user.id}
          activeOpacity={0.5}
          onPress={goToUserProfile(review.user.id)}
        >
          <Box pt={SIZE.s2m} direction="row" alignItems="center">
            <ProfilePicture uri={review.user.avatar || null} width={30} height={30} />
            <Box pl={8}>
              <Text style={styles.userName}>{review.user.full_name}</Text>
            </Box>
          </Box>
        </TouchableOpacity>
        {/* ICONS */}
        <Box
          pt={SIZE.md}
          fullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box direction="row" justifyContent="space-between" fullWidth>
            <Box direction="row">
              <TouchableOpacity
                onPress={goToReview}
                style={styles.likeContainer}
              >
                <AppIcon name="comment" color="dark" />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loadingLike}
                hitSlop={HIT_SLOP}
                style={styles.likeContainer}
                onPress={handlePressLike}
              >
                <AppIcon
                  name="likeFinger"
                  color={review.user_liked ? 'dark' : 'gray'}
                />
                <Text style={styles.likeCount}>{review.like}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loadingLike}
                hitSlop={HIT_SLOP}
                style={styles.likeContainer}
                onPress={handlePressDislike}
              >
                <AppIcon
                  name="dislike"
                  color={review.user_disliked ? 'dark' : 'gray'}
                />
                <Text style={styles.likeCount}>{review.dislike}</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewFullCard;

import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Box } from "ui-kit/box";
import { AppIcon } from "assets/index";
import { parseISO, format } from "date-fns";
import { navigate } from "shared/navigation/root-navigator.config";
import { AppUserRoutes } from "shared/navigation/app-user";
import { changeLike, getReviewDetail } from "services/api/user/user";
import { ReviewType } from "shared/types";
import { ProfilePicture } from "shared/ui-kit/profile-picture";
import { SIZE } from "shared/constants";
import { ReviewItemProps } from "./review-item.types";
import { useStyles } from "./review-item.styles";
import RateStars from "../../../screens/app-user/rate-track/components/rate-stars/rate-stars.component";

const ReviewItem = ({ review }: ReviewItemProps) => {
  const styles = useStyles();
  const [reviewData, setReviewData] = useState<ReviewType>(review);

  useEffect(() => {
    setReviewData(review);
  }, [review]);

  const parseDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const goToReview = () => {
    navigate(AppUserRoutes.ViewReview, { reviewId: review.id });
  };

  const handleGetReview = async () => {
    try {
      const { data } = await getReviewDetail(reviewData.id);
      setReviewData(data);
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  const handlePressLike = async () => {
    try {
      const { user_liked, user_disliked, like, dislike } = reviewData;
      setReviewData({
        ...reviewData,
        like: !user_liked ? like + 1 : like - 1,
        user_liked: !user_liked,
        user_disliked: false,
        dislike: user_disliked ? dislike - 1 : dislike
      });
      await changeLike(reviewData.id, { like: user_liked ? null : true });
      await handleGetReview();
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  const handlePressDislike = async () => {
    try {
      const { user_disliked, user_liked, id, dislike, like } = reviewData;
      setReviewData({
        ...review,
        dislike: !user_disliked ? dislike + 1 : dislike - 1,
        user_disliked: !user_disliked,
        user_liked: false,
        like: user_liked ? like - 1 : like
      });
      await changeLike(id, { like: user_disliked ? null : false });
      await handleGetReview();
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  return (
    <View style={styles.containerOverlay}>
      {reviewData.text ?
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            {/* DATE */}
            <Text style={styles.dateText}>{parseDate(reviewData.create_at)}</Text>
            <Box justifyContent='flex-end' direction="row" alignItems="center">
              {/* AVATAR */}
              <Box mr={SIZE.s}>
                <ProfilePicture uri={reviewData?.user?.avatar} height={SIZE.md} width={SIZE.md} />
              </Box>
               {/* USERNAME */}
              <Box style={styles.nameTextContainer}>
              <Text numberOfLines={1} style={styles.nameText}>{reviewData?.user?.full_name}</Text>
              </Box>
              {/* RATE */}
              <Box direction="row" alignItems="center" ml={12}>
                <AppIcon name="starFull" color="orange" size={16} />
                <Box direction="row" alignItems="flex-end" ml={4}>
                  <Text style={styles.averageRating}>{reviewData.rate}</Text>
                  <Text style={styles.totalRating}> /5</Text>
                </Box>
              </Box>
            </Box>
          </View>
          <View style={styles.reviewTextContainer}>
            <Text numberOfLines={4} style={styles.reviewText}>{reviewData.text}</Text>
          </View>
          <Box pt={8} fullWidth direction="row" alignItems="center" justifyContent="space-between">
            <Box direction="row" justifyContent="space-between" fullWidth>
              <Box direction="row">
                <TouchableOpacity onPress={goToReview}>
                  <AppIcon name="comment" color="dark" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.likeContainer} onPress={handlePressLike}>
                  <AppIcon name="likeFinger" color={reviewData.user_liked ? "dark" : "gray"} />
                  <Text>{reviewData.like}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.likeContainer} onPress={handlePressDislike}>
                  <AppIcon name="dislike" color={reviewData.user_disliked ? "dark" : "gray"} />
                  <Text>{reviewData.dislike}</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </View>
        :
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.dateText}>{parseDate(reviewData.create_at)}</Text>
            <Box direction="row" alignItems="center">
              <Box mr={SIZE.s}>
                <ProfilePicture uri={reviewData?.user?.avatar} height={SIZE.md} width={SIZE.md} />
              </Box>
              <Text style={styles.nameText}>{reviewData?.user?.full_name}</Text>
            </Box>
          </View>
          <View style={styles.reviewTextContainer1}>
            <RateStars rating={reviewData.rate} iconSize={18} />
          </View>
          <Box pt={8} fullWidth direction="row" alignItems="center" justifyContent="space-between">
            <Box direction="row" justifyContent="space-between" fullWidth>
              <Box direction="row">
                <TouchableOpacity onPress={goToReview}>
                  <AppIcon name="comment" color="dark" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.likeContainer} onPress={handlePressLike}>
                  <AppIcon name="likeFinger" color={reviewData.user_liked ? "dark" : "gray"} />
                  <Text>{reviewData.like}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.likeContainer} onPress={handlePressDislike}>
                  <AppIcon name="dislike" color={reviewData.user_disliked ? "dark" : "gray"} />
                  <Text>{reviewData.dislike}</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </View>
      }
    </View>
  );
};


export default ReviewItem;

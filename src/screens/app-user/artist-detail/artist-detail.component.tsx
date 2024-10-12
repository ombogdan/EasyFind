import React, { useEffect, useState } from "react";

import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Header } from "components/header";
import { Box } from "ui-kit/box";
import { BUTTON_VARIANTS, LOTTIE_BLACK_LOADER } from "constants/index";
import { CustomButton } from "ui-kit/custom-button";
import { AppIcon } from "assets/index";
import { navigate } from "shared/navigation/root-navigator.config";
import { getArtistsDetail } from "services/api/user/user";
import { ArtistDetailType, ReviewType } from "shared/types";
import Lottie from "lottie-react-native";
import { RatingChart } from "components/rating-chart";
import { AppUserRoutes } from "shared/navigation/app-user";
import { useScale } from "hooks/useScale";
import { useFetchReviewsByMusicId } from "shared/hooks/api";
import { useFocusEffect } from "@react-navigation/native";
import { useStyles } from "./artist-detail.styles";
import MostPopularTile from "./components/most-popular-tile/most-popular-tile.component";
import ReviewItem from "../../../shared/components/review-item/review-item.component";

const ArtistDetail = ({ route }: any) => {
  const styles = useStyles();
  const scale = useScale();
  const { id } = route?.params ?? {};
  const [artistData, setArtistData] = useState<ArtistDetailType>({
    ratings: [],
    most_popular: [],
    averageRating: 0,
    describe: "",
    friendsRating: [],
    genres: [],
    id: "",
    listsWith: [],
    name: "",
    photo: { url: "" },
    topReviews: [],
    totalRating: 0,
    yourRating: 0,
    yourReviewId: null,
  });
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const {fetchReviewsByMusicId} = useFetchReviewsByMusicId()

  const handleGetArtistDetail = async () => {
    try {
      const { data } = await getArtistsDetail(id);
      setArtistData(data);
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  const handleGetReviews = async () => {
    fetchReviewsByMusicId({
      id,
      type: 'artists',
      limit: 3,
      successCallback(res) {
        setReviews(res.data)
      },
    })
  };

  useEffect(() => {
    handleGetArtistDetail();
    handleGetReviews();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetArtistDetail();
      handleGetReviews();
    }, [])
  );

  const handlePressRate = () => {
    const reviewItemData = {
      id: artistData.id,
      name: artistData.name,
      image: [{ url: artistData.photo?.url ?? "" }]
    };
    navigate(AppUserRoutes.RateTrack, { id, type: "artists", reviewItem: reviewItemData });
  };

  const handlePressMyReview = () => {
    navigate(AppUserRoutes.ViewReview, { reviewId: artistData.yourReviewId });
  };

  const onPressAllReviews = () => {
    navigate(AppUserRoutes.TrackReviewList, {
      music_id: id,
      type: 'artists',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton leftIcon="dots" />
      {artistData.id ?
        <ScrollView style={styles.scrollContainer}>
          <Box alignItems="center" pt={20}>
            {artistData?.photo &&
              <Image source={{ uri: artistData?.photo?.url }} style={styles.trackIcon} resizeMode="cover" />
            }
            <Box pt={25}>
              <Text style={styles.artistName} numberOfLines={2}>{artistData?.name ?? ""}</Text>
            </Box>
            <View style={styles.describeContainer}>
              <Text numberOfLines={4} style={styles.describe}>{artistData.describe}</Text>
            </View>
            <View style={styles.ratesContainer}>
              <View style={styles.rateItemContainer}>
                <Image source={require("shared/assets/icons/rate_tile.png")} style={styles.rateTile} />
                <Text style={styles.rateTitle}>Total Rating</Text>
                <Text style={styles.ratingCountAbsolute}>{artistData?.totalRating ?? 0}</Text>
              </View>
              <View style={styles.rateItemContainer}>
                <Image source={require("shared/assets/icons/rate_tile.png")} style={styles.rateTile} />
                <Text style={styles.rateTitle}>Average Rating</Text>
                <View style={styles.averageRatingContainer}>
                  <AppIcon name="starFull" color="orange" />
                  <Text style={styles.ratingCount}>{artistData?.averageRating ?? 0}</Text>
                  <Text style={styles.ratingCountFull}>/5</Text>
                </View>
              </View>
              <View style={styles.rateItemContainer}>
                <Image source={require("shared/assets/icons/rate_tile.png")} style={styles.rateTile} />
                <Text style={styles.rateTitle}>Your Rating</Text>
                <View style={styles.averageRatingContainer}>
                  <AppIcon name="starFull" color={(artistData?.yourRating ?? 0) === 0 ? "gray" : "orange"} />
                  <Text style={styles.ratingCount}>{artistData?.yourRating ?? 0}</Text>
                  <Text style={styles.ratingCountFull}>/5</Text>
                </View>
              </View>
            </View>
            {(artistData?.yourRating ?? 0) === 0 ?
              <Box pt={24} mr={3} fullWidth>
                <CustomButton
                  variant={BUTTON_VARIANTS.primary}
                  onPress={handlePressRate}
                  title="Rate Artist"
                  leftIcon="star"
                />
              </Box>
              :
              <Box pt={24} mr={3} direction="row" justifyContent="space-between" fullWidth>
                <View style={styles.buttonItemContainer}>
                  <CustomButton
                    variant={BUTTON_VARIANTS.primary}
                    onPress={handlePressRate}
                    title="Edit Rating"
                    leftIcon="starFull"
                    iconSize={27}
                  />
                </View>
                <View style={styles.buttonItemContainer}>
                  <CustomButton
                    variant={BUTTON_VARIANTS.primary}
                    onPress={handlePressMyReview}
                    title="My Review"
                    leftIcon="eye"
                    iconSize={27}
                  />
                </View>
              </Box>
            }
            <Box fullWidth pt={48}>
              <Text style={styles.blockTitle}>Most Popular Songs</Text>
              <Box pt={16} mr={2}>
                {(artistData?.most_popular ?? []).slice(0, 4).map((track, index) => (
                  <MostPopularTile track={track} index={index + 1} key={track.id} />
                ))}
              </Box>
            </Box>
            {reviews.length > 0 &&
              <Box>
                <Box pt={16} justifyContent="space-between" alignItems="center" direction="row">
                  <Text style={styles.blockTitle}>All Reviews</Text>
                  <CustomButton
                    containerStyle={{ height: scale(40), width: scale(40), marginRight: scale(2) }}
                    variant={BUTTON_VARIANTS.secondary}
                    onPress={onPressAllReviews}
                    rightIcon="arrow_right_small"
                  />
                </Box>
                <Box pt={16} mr={2}>
                  {reviews.map((review) => (
                    <ReviewItem review={review} key={review.id} />
                  ))}
                </Box>
              </Box>
            }
            <Box pt={40} fullWidth>
              <Text style={styles.blockTitle}>Information</Text>
              <RatingChart data={artistData.ratings} />
            </Box>
          </Box>
        </ScrollView>
        :
        <View style={styles.loaderContainer}>
          <Lottie style={styles.loader} source={LOTTIE_BLACK_LOADER} autoPlay loop />
        </View>
      }
    </SafeAreaView>
  );
};

export default ArtistDetail;

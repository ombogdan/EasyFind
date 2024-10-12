import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from 'components/header';
import { Box } from 'ui-kit/box';
import { BUTTON_VARIANTS, LOTTIE_BLACK_LOADER } from 'constants/index';
import { CustomButton } from 'ui-kit/custom-button';
import { AppIcon } from 'assets/index';
import { navigate } from 'shared/navigation/root-navigator.config';
import { useScale } from 'hooks/useScale';
import {
  getAlbumDetail,
  getTrackDetail,
} from 'services/api/user/user';
import { ReviewType, TrackDetailType } from 'shared/types';
import Lottie from 'lottie-react-native';
import { RatingChart } from 'components/rating-chart';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';
import { parseISO, format } from 'date-fns';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFetchReviewsByMusicId } from 'shared/hooks/api';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useFocusEffect } from '@react-navigation/native';
import { useStyles } from './track-detail.styles';
import ReviewItem from '../../../shared/components/review-item/review-item.component';

const TrackDetail = ({ route }: any) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insets });
  const scale = useScale();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['27%', '27%'], []);

  const { id, isTrack } = route?.params ?? {};
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(true);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [trackData, setTrackData] = useState<TrackDetailType>({
    artists: [],
    averageRating: 0,
    friendsRating: [],
    ratings: [],
    id: '',
    information: { duration: [] },
    listsWith: [],
    name: '',
    photo: { url: '' },
    topReviews: [],
    totalRating: 0,
    yourRating: 0,
    yourReviewId: null,
  });

  const { fetchReviewsByMusicId } = useFetchReviewsByMusicId();

  const handleGetTrackDetail = async () => {
    try {
      if (isTrack) {
        const { data } = await getTrackDetail(id);
        setTrackData(data);
      } else {
        const { data } = await getAlbumDetail(id);
        setTrackData(data);
      }
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  const handleGetReviews = async () => {
    fetchReviewsByMusicId({
      successCallback(res) {
        setReviews(res.data);
      },
      id,
      type: isTrack ? 'tracks' : 'albums',
      limit: 3,
    });
  };

  useEffect(() => {
    setTrackData({
      artists: [],
      averageRating: 0,
      friendsRating: [],
      ratings: [],
      id: '',
      information: { duration: [] },
      listsWith: [],
      name: '',
      photo: { url: '' },
      topReviews: [],
      totalRating: 0,
      yourRating: 0,
      yourReviewId: null,
    });
    handleGetTrackDetail();
    handleGetReviews();
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      handleGetTrackDetail();
      handleGetReviews();
    }, []),
  );

  const handlePressRate = () => {
    const reviewItemData = {
      id: trackData.id,
      name: trackData.name,
      image: [{ url: trackData.photo?.url ?? '' }],
      artist: trackData.artists,
    };
    navigate(AppUserRoutes.RateTrack, {
      id,
      type: isTrack ? 'tracks' : 'albums',
      reviewItem: reviewItemData,
    });
  };

  function formatDate(inputDate: string) {
    const date = parseISO(inputDate);
    return format(date, 'MMMM dd, yyyy');
  }

  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === -1);
  }, []);

  const handleGoToArtist = (artistId: string) => {
    navigate(AppUserRoutes.ArtistDetail, { id: artistId });
  };

  const handlePressMyReview = () => {
    navigate(AppUserRoutes.ViewReview, { reviewId: trackData.yourReviewId });
  };

  const onPressAllReviews = () => {
    navigate(AppUserRoutes.TrackReviewList, {
      music_id: trackData.id,
      type: isTrack ? 'tracks' : 'albums',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton onPressLeftButton={handleOpenBottomSheet} />
      {trackData.id ? (
        <ScrollView style={styles.scrollContainer}>
          <Box alignItems="center" pt={20}>
            {trackData?.photo && (
              <Image
                source={{ uri: trackData?.photo?.url }}
                style={styles.trackIcon}
                resizeMode="cover"
              />
            )}
            <Box pt={16}>
              <Text style={styles.trackName} numberOfLines={2}>
                {trackData?.name ?? ''}
              </Text>
            </Box>
          </Box>
          {(trackData?.artists ?? []).map((artistItem) => (
            <TouchableOpacity
              onPress={() => {
                handleGoToArtist(artistItem.id);
              }}
              style={styles.artistItemContainer}
              key={artistItem.id}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  maxWidth: '60%',
                }}
              >
                <Image
                  source={{ uri: artistItem?.photo?.url }}
                  style={styles.artistIcon}
                  resizeMode="cover"
                />
                <Text style={styles.artistName} numberOfLines={1}>
                  {artistItem?.name ?? ''}
                </Text>
              </View>
              <Box direction="row" alignItems="center">
                <Text style={styles.dateText}>{`${
                  isTrack ? 'Single' : 'Album'
                } / ${
                  trackData?.information?.dataRelease?.replace(/-/g, '.') ?? ''
                }`}</Text>
              </Box>
            </TouchableOpacity>
          ))}
          <View style={styles.ratesContainer}>
            <View style={styles.rateItemContainer}>
              <Image
                source={require('shared/assets/icons/rate_tile.png')}
                style={styles.rateTile}
              />
              <Text style={styles.rateTitle}>Total Rating</Text>
              <Text style={styles.ratingCountAbsolute}>
                {trackData?.totalRating ?? 0}
              </Text>
            </View>
            <View style={styles.rateItemContainer}>
              <Image
                source={require('shared/assets/icons/rate_tile.png')}
                style={styles.rateTile}
              />
              <Text style={styles.rateTitle}>Average Rating</Text>
              <View style={styles.averageRatingContainer}>
                <AppIcon name="starFull" color="orange" />
                <Text style={styles.ratingCount}>
                  {trackData?.averageRating ?? 0}
                </Text>
                <Text style={styles.ratingCountFull}>/5</Text>
              </View>
            </View>
            <View style={styles.rateItemContainer}>
              <Image
                source={require('shared/assets/icons/rate_tile.png')}
                style={styles.rateTile}
              />
              <Text style={styles.rateTitle}>Your Rating</Text>
              <View style={styles.averageRatingContainer}>
                <AppIcon
                  name="starFull"
                  color={(trackData?.yourRating ?? 0) === 0 ? 'gray' : 'orange'}
                />
                <Text style={styles.ratingCount}>
                  {trackData?.yourRating ?? 0}
                </Text>
                <Text style={styles.ratingCountFull}>/5</Text>
              </View>
            </View>
          </View>

          {(trackData?.yourRating ?? 0) === 0 ? (
            <Box pt={24} mr={5}>
              <CustomButton
                variant={BUTTON_VARIANTS.primary}
                onPress={handlePressRate}
                title="Add Review"
                leftIcon="star"
              />
            </Box>
          ) : (
            <Box
              pt={24}
              pr={5}
              direction="row"
              justifyContent="space-between"
              fullWidth
            >
              <View style={styles.buttonItemContainer}>
                <CustomButton
                  variant={BUTTON_VARIANTS.primary}
                  onPress={handlePressRate}
                  title="Edit Review"
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
          )}
          {reviews.length > 0 && (
            <Box>
              <Box
                pt={16}
                pr={5}
                justifyContent="space-between"
                alignItems="center"
                direction="row"
              >
                <Text style={styles.topReviewsTitle}>All Reviews</Text>
                <CustomButton
                  containerStyle={{ height: scale(40), width: scale(40) }}
                  variant={BUTTON_VARIANTS.secondary}
                  onPress={onPressAllReviews}
                  rightIcon="arrow_right_small"
                />
              </Box>
              <Box pt={16} pr={3}>
                {reviews.map((review) => (
                  <ReviewItem review={review} key={review.id} />
                ))}
              </Box>
            </Box>
          )}
          <Box pt={40}>
            <Text style={styles.topReviewsTitle}>Information</Text>
            <RatingChart data={trackData?.ratings ?? []} />
          </Box>
          <View style={styles.containerOverlay}>
            <View style={styles.infoContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.infoItemName}>Release Date</Text>
                <Text style={styles.infoItemData}>
                  {trackData?.information.dataRelease
                    ? formatDate(trackData?.information.dataRelease)
                    : '-'}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.infoItemName}>Duration</Text>
                <Text style={styles.infoItemData}>{`${
                  trackData?.information?.duration?.[0] ?? 0
                } min ${trackData?.information?.duration?.[1] ?? 0} sec`}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.infoItemName}>Genres</Text>
                <View style={styles.genresContainer}>
                  <Text numberOfLines={1} style={styles.infoItemData}>
                    {trackData?.artists?.[0]?.genres
                      ?.slice(0, 3)
                      .map((genre) => capitalizeFirstLetter(genre))
                      .join(', ') ?? ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loaderContainer}>
          <Lottie
            style={styles.loader}
            source={LOTTIE_BLACK_LOADER}
            autoPlay
            loop
          />
        </View>
      )}
      <BottomSheetModalProvider>
        <Pressable
          onPress={() => {
            bottomSheetModalRef.current?.close();
          }}
          style={[
            styles.containerBottomSheet,
            isBottomSheetOpen ? styles.dimBackground : null,
          ]}
        >
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View style={styles.sheetItemContainer}>
                <Text style={styles.sheetButtonText}>{`Rate ${
                  isTrack ? 'Single' : 'Album'
                }`}</Text>
                <AppIcon name="emptyStar" size={25} />
              </View>
              <View style={styles.sheetItemContainer}>
                <Text style={styles.sheetButtonText}>Add Album to a List</Text>
                <AppIcon name="addToList" size={25} />
              </View>
              <View
                style={[styles.sheetItemContainer, { borderBottomWidth: 0 }]}
              >
                <Text style={styles.sheetButtonText}>Share</Text>
                <AppIcon name="share" size={25} />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </Pressable>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default TrackDetail;

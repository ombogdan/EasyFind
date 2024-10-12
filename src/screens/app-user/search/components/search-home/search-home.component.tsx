import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box } from 'shared/ui-kit/box';
import { getSpotifyRecommend } from 'shared/core/services/api/user/user';
import {
  searchActions,
  searchRecommendedSelector,
} from 'shared/store/slices/search';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from 'shared/store';
import { LOTTIE_BLACK_LOADER } from 'shared/constants';
import LottieView from 'lottie-react-native';
import { MostPopularTile } from '../most-popular-tile';
import { GenreTile } from '../genre-tile';
import { useStyles } from './search-home.styles';

const SearchHome = () => {
  const styles = useStyles();
  const [refreshing, setRefreshing] = useState(false);
  const searchScreenData = useSelector(searchRecommendedSelector);

  const dispath = useTypedDispatch();

  const getRecommend = async () => {
    try {
      setRefreshing(true);
      const data = await getSpotifyRecommend();
      dispath(searchActions.setSearchRecommended(data.data));
    } catch (error) {
      return;
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (searchScreenData.genre.length) return;
    getRecommend();
  }, [searchScreenData]);

  return (
    <View>
      {searchScreenData.genre.length ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getRecommend} />
          }
        >
          {/* GENRES */}
          <Box pl={16} pt={16} pr={16}>
            <Text style={styles.titleText}>Genres</Text>
            <View style={styles.genreTilesContainer}>
              {(searchScreenData?.genre ?? []).map((genre, index: number) => (
                <GenreTile genreItem={genre} key={genre.name} index={index} />
              ))}
            </View>
          </Box>
          {/* MOST POPULAR */}
          <Box pt={36} pl={16}>
            <Text style={styles.titleText}>Most popular</Text>
            <FlatList
              data={searchScreenData?.most_popular ?? []}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => (item?.id ?? '').toString()}
              renderItem={({ item, index }) => (
                <MostPopularTile
                  trackItem={item}
                  key={item?.id ?? ''}
                  index={index}
                />
              )}
              style={styles.mostPopularTilesContainer}
            />
          </Box>
          <View style={{ height: 100 }} />
        </ScrollView>
      ) : (
        <View style={styles.loaderContainer}>
          <LottieView
            style={styles.loader}
            source={LOTTIE_BLACK_LOADER}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
};

export default SearchHome;

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomInput from 'shared/ui-kit/custom-input/custom-input.component';
import LottieView from 'lottie-react-native';
import { LOTTIE_BLACK_LOADER, SIZE } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { LoadingType } from 'shared/types';
import { Title } from 'shared/ui-kit/title';
import { AppIcon } from 'shared/assets';
import { useStyles } from './search-music.styles';
import { SearchItem } from '../../components/search-item';
import useSearchMusic from './search-music.hook';

const SearchMusic = () => {
  const styles = useStyles();
  const {
    isNoMatch,
    handleSearch,
    onPressDone,
    handleViewAll,
    onRightIconPress,
    searchData,
    search,
    loading,
    is_select_favorite,
  } = useSearchMusic();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* SEARCH */}
        <Box flex={1}>
          {loading === LoadingType.FETCH && (
            <View style={styles.searchLoadingContainer}>
              <LottieView
                style={styles.searchLoading}
                source={LOTTIE_BLACK_LOADER}
                autoPlay
                loop
              />
            </View>
          )}
          <CustomInput
            autoFocus
            value={search}
            onChangeValue={handleSearch}
            styleContainer={styles.inputContainer}
            search
            maxLength={256}
            placeholder="Search music"
            leftIcon="search_loupe"
            rightIcon={search.length ? 'cross' : undefined}
            onRightIconPress={onRightIconPress}
          />
        </Box>
        <Box pl={SIZE.md} justifyContent="center" alignItems="center">
          <TouchableOpacity activeOpacity={0.5} onPress={onPressDone}>
            <Text style={styles.done}>Done</Text>
          </TouchableOpacity>
        </Box>
      </View>
      {/* NO MATCH */}
      {isNoMatch && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text style={styles.notFoundTitle}>No results found</Text>
          <Text style={styles.notFoundDescribe}>
            Try adjusting your search to find what you are looking for
          </Text>
        </Box>
      )}
      {searchData === null && search.length === 0 && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Box>
            <AppIcon
              name="search_loupe"
              style={styles.notFoundIcon}
              color="gray"
            />
          </Box>
          <Text style={styles.notFoundDescribe}>
            Add albums or tracks to list
          </Text>
        </Box>
      )}
      {/* DATA LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {/* ALBOMS */}
        {searchData && searchData?.albums?.length > 0 && (
          <Box mt={SIZE.xl}>
            {!is_select_favorite && <Title text="Albums" />}
            {searchData.albums
              .slice(0, is_select_favorite ? 20 : 5)
              .map((album) => (
                <SearchItem type_object='albums' key={album.id} entity={album} />
              ))}
            {!is_select_favorite && (
              <Box mt={SIZE.s2m}>
                <TouchableOpacity
                  onPress={handleViewAll('albums')}
                  activeOpacity={0.5}
                >
                  <Text style={styles.done}>View all Albums</Text>
                </TouchableOpacity>
              </Box>
            )}
          </Box>
        )}
        {/* TRACKS */}
        {!is_select_favorite &&
          searchData &&
          searchData?.tracks?.length > 0 && (
            <Box mt={SIZE.xl}>
              <Title text="Tracks" />
              {searchData.tracks.slice(0, 5).map((track) => (
                <SearchItem type_object='tracks' key={track.id} entity={track} />
              ))}
              <Box mt={SIZE.s2m}>
                <TouchableOpacity
                  onPress={handleViewAll('tracks')}
                  activeOpacity={0.5}
                >
                  <Text style={styles.done}>View all Tracks</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchMusic;

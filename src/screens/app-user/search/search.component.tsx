import React from 'react';

import { LOTTIE_BLACK_LOADER, SIZE } from 'constants/index';
import Lottie from 'lottie-react-native';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContainerComponent } from 'shared/containers/auth-container';
import { Box } from 'ui-kit/box';
import CustomInput from 'ui-kit/custom-input/custom-input.component';
import { MusicTab } from './components/music-tab';
import ReviewTab from './components/review-tab/review-tab.component';
import { SearchHome } from './components/search-home';
import { UsersTab } from './components/users-tab';
import useSearch from './search.hook';
import { useStyles } from './search.styles';
import { SearchTab as SearchTabType } from './search.types';
import { SearchTabs } from './components/search-tabs';

const Search = () => {
  const styles = useStyles();
  const {
    handleCloseSearch,
    handlePressFilter,
    onChangeValue,
    focusSearch,
    activeTab,
    is_loading,
    search,
    filter_count,
  } = useSearch();

  return (
    <SafeAreaView style={styles.container}>
      {/* SEARCH HEADER */}
      <View style={styles.headerContainer}>
        <Box
          flex={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {is_loading && (
            <View style={styles.searchLoadingContainer}>
              <Lottie
                style={styles.searchLoading}
                source={LOTTIE_BLACK_LOADER}
                autoPlay
                loop
              />
            </View>
          )}
          <CustomInput
            value={search}
            onChangeValue={onChangeValue}
            styleContainer={styles.inputContainer}
            search
            maxLength={256}
            placeholder="Search"
            leftIcon="search_loupe"
            rightIcon={focusSearch ? 'cross' : undefined}
            onRightIconPress={handleCloseSearch}
          />
        </Box>
        {/* FILTER BUTTON */}
        {activeTab === SearchTabType.MUSIC && search.length > 0 && (
          <Box ml={SIZE.sm}>
            <TouchableOpacity
              onPress={handlePressFilter}
              style={styles.filterButtonContainer}
            >
              <Text style={styles.filterText}>Filter</Text>
              {filter_count && (
                <View style={styles.countContainer}>
                  <Text style={styles.countText}>!</Text>
                </View>
              )}
            </TouchableOpacity>
          </Box>
        )}
      </View>
      <AuthContainerComponent withoutLogo containerStyle={{ margin: 0 }}>
        {/* HOME */}
        {search.length === 0 ? (
          <SearchHome />
        ) : (
          <ScrollView>
            <Box pl={16} pt={16} pr={16}>
              {/* TABS */}
              <SearchTabs />
              {/* MUSIC TAB */}
              <MusicTab />
              {/* REVIEWS TAB */}
              <ReviewTab />
              {/* USERS TAB */}
              <UsersTab />
            </Box>
            <View style={{ height: 100 }} />
          </ScrollView>
        )}
      </AuthContainerComponent>
    </SafeAreaView>
  );
};

export default Search;

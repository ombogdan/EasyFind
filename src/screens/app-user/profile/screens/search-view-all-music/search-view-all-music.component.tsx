import React from 'react';

import { FlatList, SafeAreaView } from 'react-native';
import { Header } from 'components/header';
import { Box } from 'ui-kit/box';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { SIZE } from 'shared/constants';
import { useStyles } from './search-view-all-music.styles';
import { SearchItem } from '../../components/search-item';

const SearchViewAllMusic = () => {
  const styles = useStyles();
  const { params } = useAppRoute<AppUserRoutes.SearchViewAllMusic>();
  const { search, tracksData, type_object } = params ?? {};

  return (
    <SafeAreaView style={styles.container}>
      <Header name={search} backButton />
      <FlatList
        data={tracksData}
        renderItem={({ item }) => (
          <Box key={item.id} ml={SIZE.md} mr={SIZE.md}>
            <SearchItem type_object={type_object || 'albums'} entity={item} />
          </Box>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: SIZE.xl }}
      />
    </SafeAreaView>
  );
};

export default SearchViewAllMusic;

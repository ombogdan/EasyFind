import { FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header } from 'components/header';
import { useGetMusicList } from 'shared/hooks/api';
import { CustomMusicCard } from 'shared/components/custom-music-card';
import { CustomMusicList, LoadingType } from 'shared/types';
import LottieView from 'lottie-react-native';
import { LOTTIE_BLACK_LOADER } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { useStyles } from './pinned-list.styles';

const PinnedList = () => {
  const { params } = useAppRoute<AppUserRoutes.PinnedList>();
  const styles = useStyles();
  const { loading, fetchMusicList, count } = useGetMusicList();
  const [pinnedList, setPinnedList] = useState<CustomMusicList[]>([]);

  useEffect(() => {
    fetchMusicList({
      successCallback: (data) => {
        setPinnedList(data.results);
      },
      user_id: params?.public_user_id,
      is_me: params?.public_user_id || params?.recommended ? undefined : true,
      is_pinned: params?.recommended ? undefined : true,
      recommended: params?.recommended,
    });
  }, []);

  const fetchMoreTracks = async () => {
    if (count === 0 || count === pinnedList.length || loading !== LoadingType.COMPLETE) return;
    fetchMusicList({
      loading_type: LoadingType.FETCH_MORE,
      successCallback: (data) => {
        setPinnedList([...pinnedList, ...data.results]);
      },
      is_pinned: params?.recommended ? undefined : true,
      recommended: params?.recommended,
      offset: pinnedList.length,
    });
  };

  const handleUpdate = (item: CustomMusicList) => {
    setPinnedList(pinnedList.map((i) => (i.id === item.id ? item : i)));
  };

  const onPressItem = (item: CustomMusicList) => () => {
    navigate(AppUserRoutes.CustomListDetails, { item });
  };

  const listHeaderComponent = () => (
    <Box flex={1} justifyContent="center" alignItems="center">
      <LottieView
        style={{ height: 150, width: 150 }}
        source={LOTTIE_BLACK_LOADER}
        autoPlay
        loop
      />
    </Box>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton name={params?.recommended ? "Recommended list" : "Pinned list"} />
      <FlatList
        onEndReached={fetchMoreTracks}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          loading === LoadingType.FETCH ? listHeaderComponent : null
        }
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={loading === LoadingType.FETCH_MORE ? listHeaderComponent : null}
        keyExtractor={(item) => item.id.toString()}
        data={pinnedList}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.5} onPress={onPressItem(item)}>
            <CustomMusicCard item={item} handleUpdate={handleUpdate} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default PinnedList;

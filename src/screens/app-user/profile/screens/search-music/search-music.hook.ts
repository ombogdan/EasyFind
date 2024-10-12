import { useCallback, useState } from 'react';
import {
  StackActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { useSearchMusic as useSearchSpotifyMusic, useUpdateCustomMusicTracks } from 'shared/hooks/api';
import { LoadingType, SpotifySearchResponse } from 'shared/types';
import { debounce } from 'lodash';
import { goBack, navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useSelector } from 'react-redux';
import { profileActions, profileCustomListIdSelector, profileIsFavoriteSelector, profileSelectedMusicSelector } from 'shared/store/slices/profile';
import { useTypedDispatch } from 'shared/store';

const useSearchMusic = () => {
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state.routes);
  const { loading, fetchData } = useSearchSpotifyMusic();
  const prevRoute = routes[routes.length - 2].name;
  const is_select_favorite = useSelector(profileIsFavoriteSelector);
  const selected_music = useSelector(profileSelectedMusicSelector);
  const update_id = useSelector(profileCustomListIdSelector);
  const { loading: loadingTracks, setCustomTracks } =
  useUpdateCustomMusicTracks();
  const dispatch = useTypedDispatch()

  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<SpotifySearchResponse | null>(
    null,
  );

  const isNoMatch =
    searchData !== null &&
    !searchData.albums.length &&
    !searchData.tracks.length &&
    search.length > 0 &&
    loading === LoadingType.COMPLETE;

  const fetchSearchResults = async (text: string) => {
    if (text.length === 0) {
      setSearchData(null);
      return;
    }
    fetchData({
      query_param: text,
      successCallback: (response) => setSearchData(response),
    });
  };

  const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), []);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const onPressDone = () => {
    if (update_id) {
      setCustomTracks({
        successCallback: (data) => {
          dispatch(profileActions.setSelectedMusicList(data));
        },
        id: update_id,
        props: selected_music,
      });
    }
    if (prevRoute === AppUserRoutes.ListForm) {
      navigation.dispatch(StackActions.replace(AppUserRoutes.CustomListMusic));
      return;
    }
    goBack();
  };

  const handleViewAll = (variant: 'tracks' | 'albums') => () => {
    navigate(AppUserRoutes.SearchViewAllMusic, {
      search,
      type_object: variant,
      tracksData:
        variant === 'albums'
          ? searchData?.albums ?? []
          : searchData?.tracks ?? [],
    });
  };

  const onRightIconPress = () => {
    setSearchData(null);
    setSearch('');
  };

  return {
    handleSearch,
    handleViewAll,
    onPressDone,
    isNoMatch,
    searchData,
    onRightIconPress,
    search,
    loading,
    is_select_favorite,
  };
};

export default useSearchMusic;

import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import {
  getSearchData,
  getSearchReviewData,
  getSearchUsers,
} from 'shared/core/services/api/user/user';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { navigate } from 'shared/navigation/root-navigator.config';
import { useTypedDispatch } from 'shared/store';
import {
  searchYearFilterSelector,
  searchSortedByFiltersSelector,
  searchLoadingSelector,
  searchActions,
  searchActiveTabSelector,
} from 'shared/store/slices/search';
import { LoadingType, SearchTab } from 'shared/types';
import { SearchTab as SearchTabType } from './search.types';

const useSearch = () => {
  const dispath = useTypedDispatch();
  const years_filter = useSelector(searchYearFilterSelector);
  const sorted_by_filter = useSelector(searchSortedByFiltersSelector);
  const active_tab = useSelector(searchActiveTabSelector);
  const loading = useSelector(searchLoadingSelector);
  const [search, setSearch] = useState('');
  const [focusSearch, setFocusSearch] = useState(false);

  const is_loading = loading === LoadingType.FETCH;

  const filter_count = years_filter || sorted_by_filter;

  const handleCloseSearch = () => {
    setSearch('');
    setFocusSearch(false);
  };

  const handlePressFilter = () => {
    navigate(AppUserRoutes.SearchFilters);
  };

  const handleSearch = useCallback(
    debounce(async (newSearch: string) => {
      try {
        const params = {
          query_param: newSearch,
          ...(sorted_by_filter ? { sort_by: sorted_by_filter } : {}),
          ...(years_filter ? { release_year: years_filter } : {}),
        };
        const data = await getSearchData(params);
        dispath(searchActions.setSearchMusic(data.data));
      } catch (error) {
        // @ts-ignore
        console.log(error?.response?.data);
      } finally {
        dispath(searchActions.setSearchLoading(LoadingType.COMPLETE));
      }
    }, 600),
    [],
  );

  const handleSearchDebounce = async (newSearch: string) => {
    setFocusSearch(true);
    setSearch(newSearch);
    dispath(searchActions.setSearchValue(newSearch));
    if (newSearch) {
      await handleSearch(newSearch);
    }
  };

  const handleSearchReview = useCallback(
    debounce(async (newSearch: string) => {
      try {
        const data = await getSearchReviewData({ query_param: newSearch });
        dispath(searchActions.setSearchReviews(data.data));
      } catch (error) {
        // @ts-ignore
        console.log(error?.response?.data);
      } finally {
        dispath(searchActions.setSearchLoading(LoadingType.COMPLETE));
      }
    }, 600),
    [],
  );

  const handleSearchUsers = useCallback(
    debounce(async (newSearch: string) => {
      try {
        const data = await getSearchUsers({
          search: newSearch,
          limit: 20,
          offset: 0,
        });
        dispath(searchActions.setSearchUsers(data.data.results));
      } catch (error) {
        // @ts-ignore
        console.log(error?.response?.data);
      } finally {
        dispath(searchActions.setSearchLoading(LoadingType.COMPLETE));
      }
    }, 600),
    [],
  );

  const handleChangeTab = (newTab: SearchTabType | null) => {
    if (newTab) {
      dispath(searchActions.setSearchLoading(LoadingType.FETCH));
    }
    switch (newTab) {
      case SearchTabType.MUSIC:
        handleSearch(search);
        break;
      case SearchTabType.REVIEWS:
        handleSearchReview(search);
        break;
      case SearchTabType.USERS:
        handleSearchUsers(search);
        break;
      default:
        break;
    }
  };

  const handleSearchReviewDebounce = async (newSearch: string) => {
    setFocusSearch(true);
    setSearch(newSearch);
    dispath(searchActions.setSearchValue(newSearch));
    if (newSearch) {
      await handleSearchReview(newSearch);
    }
  };

  const handleSearchUsersDebounce = async (newSearch: string) => {
    setFocusSearch(true);
    setSearch(newSearch);
    dispath(searchActions.setSearchValue(newSearch));
    if (newSearch) {
      await handleSearchUsers(newSearch);
    }
  };

  const onChangeValue = async (text: string) => {
    if (!text.trim().length) {
      dispath(searchActions.setSearchLoading(LoadingType.COMPLETE));
      setSearch('');
      dispath(searchActions.setSearchValue(''));
      return;
    }
    if (!is_loading) {
      dispath(searchActions.setSearchLoading(LoadingType.FETCH));
    }
    if (!active_tab) {
      dispath(searchActions.setSearchActiveTab(SearchTab.MUSIC));
    }
    if (active_tab === SearchTabType.MUSIC || !active_tab) {
      await handleSearchDebounce(text);
    }
    if (active_tab === SearchTabType.REVIEWS) {
      await handleSearchReviewDebounce(text);
    }
    if (active_tab === SearchTabType.USERS) {
      await handleSearchUsersDebounce(text);
    }
  }

  useEffect(() => {
    handleChangeTab(active_tab);
  }, [active_tab]);

  return {
    handleChangeTab,
    handleCloseSearch,
    handlePressFilter,
    onChangeValue,
    focusSearch,
    activeTab: active_tab,
    is_loading,
    filter_count,
    search,
  };
};

export default useSearch;

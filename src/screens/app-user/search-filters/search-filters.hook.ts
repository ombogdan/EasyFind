import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchMusic } from 'shared/hooks/api';
import { goBack } from 'shared/navigation/root-navigator.config';
import { useTypedDispatch } from 'shared/store';
import {
  searchActions,
  searchSortedByFiltersSelector,
  searchValueSelector,
  searchYearFilterSelector,
} from 'shared/store/slices/search';
import { LoadingType, SORTED_BY_FILTERS } from 'shared/types';
import { layoutAnimation } from 'shared/utils/layoutAnimation';

const useSearchFilters = () => {
  const dispatch = useTypedDispatch();
  const sorted_by_filter = useSelector(searchSortedByFiltersSelector);
  const search_value = useSelector(searchValueSelector);
  const years_filter = useSelector(searchYearFilterSelector);
  const { fetchData } = useSearchMusic();

  // local state
  const [visibleFilters, setVisibleFilters] = useState({
    sorted_by: !!sorted_by_filter,
    release_year: !!years_filter,
  });
  const [sortedByFilters, setSortedByFilters] =
    useState<SORTED_BY_FILTERS | null>(sorted_by_filter);
  const [selectedYear, setSelectedYear] = useState<null | number>(years_filter);

  const onPressCancel = () => {
    goBack();
  };

  const onPressSortedByFilter = (value: SORTED_BY_FILTERS) => () => {
    if (value === sortedByFilters) {
      setSortedByFilters(null);
      return;
    }
    setSortedByFilters(value);
  };

  const onPressYearFilter = (value: number) => () => {
    if (value === selectedYear) {
      setSelectedYear(null);
      return;
    }
    setSelectedYear(value);
  };

  const onPressFilterTitle = (key: keyof typeof visibleFilters) => () => {
    layoutAnimation();
    setVisibleFilters({
      ...visibleFilters,
      [key]: !visibleFilters[key],
    });
  };

  const onPressClearAll = () => {
    setSelectedYear(null);
    setSortedByFilters(null);
  };

  const onPressApply = async () => {
    dispatch(searchActions.setSearchLoading(LoadingType.FETCH))
    dispatch(
      searchActions.setFilters({
        sorted_by_filter: sortedByFilters,
        years_filter: selectedYear,
      }),
    );
    goBack();
    await fetchData({
      successCallback: (data) => dispatch(searchActions.setSearchMusic(data)),
      query_param: search_value,
      sorted_by_filter: sortedByFilters,
      years_filter: selectedYear,
    });
    dispatch(searchActions.setSearchLoading(LoadingType.COMPLETE))
  };

  return {
    onPressApply,
    onPressClearAll,
    onPressFilterTitle,
    onPressYearFilter,
    onPressCancel,
    onPressSortedByFilter,
    visibleFilters,
    sortedByFilters,
    selectedYear,
  };
};

export default useSearchFilters;

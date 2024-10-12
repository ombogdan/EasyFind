import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'shared/store';
import { LoadingType } from 'shared/types';
import { reducers } from './recurers';
import { SearchState } from './types';

const initialState: SearchState = {
  search_value: '',
  active_tab: null,
  is_loading: LoadingType.COMPLETE,
  users: [],
  sorted_by_filter: null,
  years_filter: null,
  reviews: [],
  music: {
    albums: [],
    artists: [],
    tracks: [],
  },
  recommended: {
    genre: [],
    most_popular: [],
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers,
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const searchUsersSelector = (state: RootState) => state.search.users;

export const searchReviewsSelector = (state: RootState) => state.search.reviews;

export const searchRecommendedSelector = (state: RootState) =>
  state.search.recommended;

export const searchSortedByFiltersSelector = (state: RootState) =>
  state.search.sorted_by_filter;

export const searchYearFilterSelector = (state: RootState) =>
  state.search.years_filter;

export const searchMusicSelector = (state: RootState) => state.search.music;

export const searchValueSelector = (state: RootState) =>
  state.search.search_value;

export const searchLoadingSelector = (state: RootState) =>
  state.search.is_loading;

export const searchActiveTabSelector = (state: RootState) =>
  state.search.active_tab;

export const searchMusicEmptyResultSelector = (state: RootState) => {
  const { albums, tracks, artists } = state.search.music;
  const result_count = albums.length + tracks.length + artists.length;
  const is_loading = state.search.is_loading === LoadingType.COMPLETE;
  return (
    result_count === 0 && is_loading === state.search.search_value.length > 0
  );
};

export const searchReviewResultSelector = (state: RootState) => {
  const {reviews} = state.search;
  const is_loading = state.search.is_loading === LoadingType.COMPLETE;
  return (
    reviews.length === 0 && is_loading === state.search.search_value.length > 0
  );
};

export const searchUserResultSelector = (state: RootState) => {
  const {users} = state.search;
  const is_loading = state.search.is_loading === LoadingType.COMPLETE;
  return (
    users.length === 0 && is_loading === state.search.search_value.length > 0
  );
};

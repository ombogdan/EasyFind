import { PayloadAction } from '@reduxjs/toolkit';
import { AuthData, LoadingType, ReviewType, SORTED_BY_FILTERS, SearchTab } from 'shared/types';
import { SearchState } from './types';

export const reducers = {
  setSearchActiveTab(
    state: SearchState,
    action: PayloadAction<SearchTab>,
  ) {
    state.active_tab = action.payload;
  },
  setSearchLoading(
    state: SearchState,
    action: PayloadAction<LoadingType>,
  ) {
    state.is_loading = action.payload;
  },
  setSearchValue(
    state: SearchState,
    action: PayloadAction<string>,
  ) {
    state.search_value = action.payload;
  },
  setSearchRecommended(
    state: SearchState,
    action: PayloadAction<SearchState['recommended']>,
  ) {
    state.recommended = action.payload;
  },
  // MUSIC
  setSearchMusic(
    state: SearchState,
    action: PayloadAction<SearchState['music']>,
  ) {
    state.music = action.payload;
  },
  // USERS
  setSearchUsers(state: SearchState, action: PayloadAction<AuthData[]>) {
    state.users = action.payload;
  },
  updateUserFollow(
    state: SearchState,
    action: PayloadAction<{ user_id: number; is_followed_by_me: boolean }>,
  ) {
    const index = state.users.findIndex((i) => i.id === action.payload.user_id);
    if (index !== -1) {
      state.users[index].is_followed_by_me = action.payload.is_followed_by_me;
    }
  },
  // REVIEWS
  setSearchReviews(state: SearchState, action: PayloadAction<ReviewType[]>) {
    state.reviews = action.payload;
  },
  updateReview(state: SearchState, action: PayloadAction<ReviewType>) {
    const index = state.reviews.findIndex((i) => i.id === action.payload.id);
    if (index !== -1) {
      state.reviews[index] = action.payload;
    }
  },
  // FILTERS
  setFilters(
    state: SearchState,
    action: PayloadAction<{
      sorted_by_filter: SORTED_BY_FILTERS | null;
      years_filter: number | null;
    }>,
  ) {
    state.years_filter = action.payload.years_filter;
    state.sorted_by_filter = action.payload.sorted_by_filter;
  },
};

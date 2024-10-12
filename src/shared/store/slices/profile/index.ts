import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'shared/store';
import { ProfileState } from './types';
import { reducers } from './recurers';

const initialState: ProfileState = {
  selected_music: [],
  favorite_music: [],
  is_select_favorite: false,
  custom_list_update_id: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers,
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

export const profileSelectedMusicSelector = (state: RootState) =>
  state.profile.selected_music;

export const profileIsFavoriteSelector = (state: RootState) =>
  state.profile.is_select_favorite;

export const profileFavoriteMusicSelector = (state: RootState) =>
  state.profile.favorite_music;

export const profileCustomListIdSelector = (state: RootState) =>
  state.profile.custom_list_update_id;

import { PayloadAction } from '@reduxjs/toolkit';
import { CustomMusicTrack } from 'shared/types';
import { ProfileState } from './types';

export const reducers = {
  // CUSTOM MUSIC
  setSelectedMusicList(state: ProfileState, action: PayloadAction<CustomMusicTrack[]>) {
    state.selected_music = action.payload;
  },
  setCustomListUpdateId(state: ProfileState, action: PayloadAction<number | string | null>) {
    state.custom_list_update_id = action.payload;
  },
  setSelectedMusic(state: ProfileState, action: PayloadAction<CustomMusicTrack>) {
    const index = state.selected_music.findIndex(
      (i) => i.id === action.payload.id,
    );
    if (index !== -1) {
      state.selected_music.splice(index, 1);
    } else {
      state.selected_music.push(action.payload);
    }
    state.selected_music = state.selected_music.map((i, idx) => ({...i, order_no: idx}))
  },
  cleanSelectedMusic(state: ProfileState) {
    state.selected_music = [];
    state.custom_list_update_id = null;
  },
  removeSelectedMusic(
    state: ProfileState,
    action: PayloadAction<number | string>,
  ): void {
    state.selected_music = state.selected_music.filter(
      (i) => i.id !== action.payload,
    ).map((i, idx) => ({...i, order_no: idx}));
  },
  // FAVORITE ACTIONS
  setFavoriteMusic(state: ProfileState, action: PayloadAction<CustomMusicTrack>) {
    state.favorite_music.push(action.payload);
    state.is_select_favorite = false;
  },
  setFavoriteMusicList(state: ProfileState, action: PayloadAction<CustomMusicTrack[]>) {
    state.favorite_music = action.payload;
    state.is_select_favorite = false;
  },
  removeFavoriteMusic(
    state: ProfileState,
    action: PayloadAction<CustomMusicTrack>,
  ): void {
    state.favorite_music = state.favorite_music.filter(
      (i) => i.id !== action.payload.id,
    );
  },
  setIsSelectFavorite(
    state: ProfileState,
    action: PayloadAction<boolean>,
  ): void {
    state.is_select_favorite = action.payload;
  },
};

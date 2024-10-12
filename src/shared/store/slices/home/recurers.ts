import { PayloadAction } from '@reduxjs/toolkit';
import { LoadingType, SpotifyEntity } from 'shared/types';
import { HomeState } from './types';

export const reducers = {
  setLoading(
    state: HomeState,
    action: PayloadAction<LoadingType>,
  ): void {
    state.loading = action.payload;
  },
  setPopular(
    state: HomeState,
    action: PayloadAction<SpotifyEntity[]>,
  ): void {
    state.popular = action.payload;
  },
  setReleases(
    state: HomeState,
    action: PayloadAction<SpotifyEntity[]>,
  ): void {
    state.releases = action.payload;
  },
};

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'shared/store';
import { LoadingType } from 'shared/types';
import { HomeState } from './types';
import { reducers } from './recurers';

const initialState: HomeState = {
  loading: LoadingType.FETCH,
  storeMarkers: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers,
});

export const homeActions = homeSlice.actions;
export const homeReducer = homeSlice.reducer;

export const homeLoadingSelector = (state: RootState) =>
  state.home.loading === LoadingType.FETCH;

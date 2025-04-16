import { createSlice } from '@reduxjs/toolkit';
import { HomeState } from './types';
import { reducers } from './recurers';

const initialState: HomeState = {
  storeMarkers: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers,
});

export const homeActions = homeSlice.actions;
export const homeReducer = homeSlice.reducer;

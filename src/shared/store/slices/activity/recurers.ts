import { PayloadAction } from '@reduxjs/toolkit';
import { Activity, LoadingType } from 'shared/types';
import { ActivityState } from './types';

export const reducers = {
  setLoading(state: ActivityState, action: PayloadAction<LoadingType>): void {
    state.loading = action.payload;
  },
  setActivityData(
    state: ActivityState,
    action: PayloadAction<Activity[]>,
  ): void {
    state.activity = action.payload;
  },
  setMoreActivityData(
    state: ActivityState,
    action: PayloadAction<Activity[]>,
  ): void {
    state.activity = [...state.activity, ...action.payload];
  },
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingType } from 'shared/types';
import { RootState } from 'shared/store';
import { unfollowUser, followUser } from 'shared/store/actions';
import { reducers } from './recurers';
import { ActivityState } from './types';

const initialState: ActivityState = {
  activity: [],
  loading: LoadingType.COMPLETE,
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(
      unfollowUser,
      (state: ActivityState, action: PayloadAction<number>) => {
        const {activity} = state
        const target_idx = activity.findIndex(i => i.receiver.id === action.payload && !i.custom_list && !i.review)
        if (target_idx !== -1) {
          activity[target_idx].receiver.is_followed_by_me = false
        }
      },
    );
    builder.addCase(
      followUser,
      (state: ActivityState, action: PayloadAction<number>) => {
        const {activity} = state
        const target_idx = activity.findIndex(i => i.receiver.id === action.payload && !i.custom_list && !i.review)
        if (target_idx !== -1) {
          activity[target_idx].receiver.is_followed_by_me = true
        }
      },
    );
  },
});

export const activityActions = activitySlice.actions;
export const activityReducer = activitySlice.reducer;

export const activityDataSelector = (state: RootState) => state.activity.activity;

export const activityLoadingSelector = (state: RootState) =>
  state.activity.loading;

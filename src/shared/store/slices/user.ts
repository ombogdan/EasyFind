import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface AuthState {
  userData: any;
  userLocation: null | {latitude: number, longitude: number};
  authed: boolean;
}

const initialState: AuthState = {
  userData: null,
  userLocation: null,
  authed: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, { payload }) {
      state.userData = payload;
      state.authed = true;
    },
    userLogout(state) {
      state.userData = null;
      state.authed = false;
    },
    setUserLocation(state, { payload }) {
      state.userLocation = payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export const userDataSelector = (state: RootState) => state.user.userData;

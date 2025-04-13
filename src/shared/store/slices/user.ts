import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface AuthState {
  userData: any;
  authed: boolean;
}

const initialState: AuthState = {
  userData: null,
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
    setUserData(state, { payload }) {
      state.userData = {
        ...state.userData,
        ...payload,
      };
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export const userDataSelector = (state: RootState) => state.user.userData;

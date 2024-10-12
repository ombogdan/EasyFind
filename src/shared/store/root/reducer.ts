import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '../slices/user';
import { homeReducer } from '../slices/home';

const collectedReducer = combineReducers({
  user: userReducer,
  home: homeReducer,
});

export default collectedReducer;

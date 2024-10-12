import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '../slices/user';

import { profileReducer } from '../slices/profile';
import { searchReducer } from '../slices/search';
import { homeReducer } from '../slices/home';
import { activityReducer } from '../slices/activity';

const collectedReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  search: searchReducer,
  home: homeReducer,
  activity: activityReducer,
});

export default collectedReducer;

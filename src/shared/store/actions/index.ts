import { createAction } from '@reduxjs/toolkit';

export const unfollowUser = createAction<number>('user/unfollow');
export const followUser = createAction<number>('user/follow');
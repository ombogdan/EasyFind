import { createSelector } from 'reselect';

const selectUserStore = (store: any) => store.user;

export const selectIsUserAuthedStatus = createSelector(
  [selectUserStore],
  (userStore) => userStore.authed,
);

export const selectUserLocation = createSelector(
  [selectUserStore],
  (userStore) => userStore.userLocation,
);

export const selectUserMe = createSelector(
  [selectUserStore],
  (userStore) => userStore.userData,
);

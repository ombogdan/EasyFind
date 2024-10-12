import { FollowerParamActionType } from 'shared/types';
import { capitalizeFirstLetter } from 'shared/utils/capitalizeFirstLetter';

export const FollowersTabs = [
  {
    key: FollowerParamActionType.FOLLOWERS,
    label: capitalizeFirstLetter(FollowerParamActionType.FOLLOWERS),
  },
  {
    key: FollowerParamActionType.FOLLOWING,
    label: capitalizeFirstLetter(FollowerParamActionType.FOLLOWING),
  },
];

import { IconName } from 'shared/assets/icon.types';
import { ReviewType } from 'shared/types';

export interface ViewReviewProps {
  reviewId: number;
  reviewItem: ReviewType;
}

export enum ActionType {
  EDIT = 'Edit Review',
  DELETE = 'Delete Review',
  GO_ALBUM = 'Go to Album',
  // SHARE = 'Share',
  REPORT = 'Report',
}

enum AuthReviewActionType {
  EDIT = ActionType.EDIT,
  DELETE = ActionType.DELETE,
  GO_ALBUM = ActionType.GO_ALBUM,
  // SHARE = ActionType.SHARE,
}

enum ReviewActionType {
  GO_ALBUM = ActionType.GO_ALBUM,
  // SHARE = ActionType.SHARE,
  REPORT = ActionType.REPORT,
}

export const ActionIcon: { [key: string]: { name: IconName; size: number } } = {
  [ActionType.EDIT]: {
    name: 'editButton',
    size: 24,
  },
  [ActionType.DELETE]: {
    name: 'delete',
    size: 24,
  },
  [ActionType.GO_ALBUM]: {
    name: 'arrow_right_small',
    size: 24,
  },
  // [ActionType.SHARE]: {
  //   name: 'share',
  //   size: 24,
  // },
  [ActionType.REPORT]: {
    name: 'report',
    size: 20,
  },
};

const createActions = <T extends { [key: string]: string }>(actionTypes: T) =>
  Object.keys(actionTypes).map((key) => ({
    key: actionTypes[key],
    label: actionTypes[key],
  }));

export const AuthReviewActions = createActions(AuthReviewActionType);
export const ReviewActions = createActions(ReviewActionType);

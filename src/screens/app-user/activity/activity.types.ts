import { ActivityType, Activity } from "shared/types";

export const ActivityAction = {
  [ActivityType.following_you]: 'Has started following you',
  [ActivityType.liked_custom_list]: 'Liked your list',
  [ActivityType.liked_review]: 'Liked your review',
  [ActivityType.liked_comment_review]: 'Liked your comment',
  [ActivityType.liked_comment_custom_list]: 'Liked your comment',
  [ActivityType.replied_comment_review]: 'Replied to your comment',
  [ActivityType.liked_replied_comment_review]: 'Liked your comment',
  [ActivityType.replied_comment_custom_list]: 'Replied to your comment',
  [ActivityType.commented_custom_list]: 'Commented your list',
  [ActivityType.commented_review]: 'Commented your review',
};

export type ActivityData = {
  today: Activity[];
  last_week: Activity[];
  earlier: Activity[];
};

export interface Section {
  title: string;
  data: Activity[];
}
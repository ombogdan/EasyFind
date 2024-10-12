import { differenceInDays, format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Activity, ActivityType } from 'shared/types';
import { ActivityData } from './activity.types';

export const ActivityAction = {
  [ActivityType.following_you]: 'Has started following you.',
  [ActivityType.liked_custom_list]: 'Liked your list',
  [ActivityType.liked_review]: 'Liked your review',
  [ActivityType.liked_comment_review]: 'Liked your comment',
  [ActivityType.liked_comment_custom_list]: 'Liked your comment',
  [ActivityType.replied_comment_review]: 'Replied to your comment',
  [ActivityType.replied_comment_custom_list]: 'Replied to your comment',
  [ActivityType.commented_custom_list]: 'Commented your list',
  [ActivityType.commented_review]: 'Commented your review',
};

export const formatTime = (dateString: string): string => {
  const date = parseISO(dateString);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }
  if (diffInDays < 7) {
    return format(date, 'EEE', { locale: enUS });
  }
  return format(date, 'dd/MM/yyyy');
};

export const groupActivity = (activity: Activity[]) => {
  const grouped: ActivityData = {
    today: [],
    last_week: [],
    earlier: [],
  };

  const now = new Date();

  activity.forEach((notification) => {
    const date = parseISO(notification.created_at);
    const diffInDays = differenceInDays(now, date);

    if (diffInDays < 1) {
      grouped.today.push(notification);
    } else if (diffInDays < 7) {
      grouped.last_week.push(notification);
    } else {
      grouped.earlier.push(notification);
    }
  });

  const sections = [
    { title: 'Today', data: grouped.today },
    { title: 'Last Week', data: grouped.last_week },
    { title: 'Earlier', data: grouped.earlier },
  ];

  return sections;
};

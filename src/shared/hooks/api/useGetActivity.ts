import { useState } from 'react';
import { getRecentActivity } from 'shared/core/services/api/user/user';
import { LoadingType, RecentActivity } from 'shared/types';

const useGetActivity = (user_id?: number) => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [activity, setActivity] = useState<RecentActivity[]>([]);

  const fetchActivity = async () => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getRecentActivity(user_id);
      setActivity(data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchActivity, activity };
};

export default useGetActivity;

import { useState } from 'react';
import { getUserStats } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

interface Response {
  reviews_count: number;
  followers_count: number;
  followings_count: number;
}

const useFetchUserStats = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [stats, setStats] = useState<Response>();

  const fetchUserStats = async (user_id: number, successCallback?: (data: Response) => void) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getUserStats(user_id);
      setStats(data);
      if (successCallback) {
        successCallback(data as Response);
      }
      return data as Response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchUserStats, stats };
};

export default useFetchUserStats;

import { useState } from 'react';
import { getSpotifyPopulars } from 'shared/core/services/api/user/user';
import { LoadingType, SpotifyEntity } from 'shared/types';

interface Params {
  successesCalback?: (data: Response) => void;
  limit?: number;
  offset?: number;
}

interface Response {
  count: number;
  data: SpotifyEntity[];
}

const useFetchPopular = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [popular, setPopular] = useState<SpotifyEntity[]>([]);

  const fetchPopular = async ({ successesCalback, limit, offset }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getSpotifyPopulars({
        limit: limit ?? 10,
        offset: offset ?? 0,
      });
      setPopular((data as Response).data);
      if (successesCalback) {
        successesCalback(data as Response);
      }
      return data as Response;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchPopular, popular };
};

export default useFetchPopular;

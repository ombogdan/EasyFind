import { useState } from 'react';
import { getSpotifyReleases } from 'shared/core/services/api/user/user';
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

const useFetchReleases = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [releases, setReleases] = useState<SpotifyEntity[]>([]);

  const fetchReleases = async ({ successesCalback, limit, offset }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getSpotifyReleases({
        limit: limit ?? 10,
        offset: offset ?? 0,
      });
      setReleases((data as Response).data);
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

  return { loading, fetchReleases, releases };
};

export default useFetchReleases;

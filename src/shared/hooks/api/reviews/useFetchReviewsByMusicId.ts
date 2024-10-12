import { useState } from 'react';
import {getReviewsList } from 'shared/core/services/api/user/user';
import { LoadingType, ReviewType, SpotifyMediaType } from 'shared/types';

interface Params {
  successCallback?: (data: Response) => void;
  id: string;
  loadingType?: LoadingType;
  type: SpotifyMediaType;
  limit?: number;
  offset?: number; 
}

type Response = {
  data: ReviewType[];
  total: number;
}

const useFetchReviewsByMusicId = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [total, setTotal] = useState(0);

  const fetchReviewsByMusicId = async ({
    successCallback,
    id,
    type,
    loadingType,
    limit = 10,
    offset = 0,
  }: Params) => {
    setLoading(loadingType ?? LoadingType.FETCH);
    try {
      const { data } = await getReviewsList(id, type, limit, offset);
      setTotal(data.total)
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

  return { total, loading, fetchReviewsByMusicId };
};

export default useFetchReviewsByMusicId;

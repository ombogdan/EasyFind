import { useState } from 'react';
import { getUserMusicList } from 'shared/core/services/api/user/user';
import { CustomMusicList, LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: Response) => void;
  loading_type?: LoadingType;
  offset?: number;
  limit?: number;
  is_pinned?: boolean;
  is_me?: boolean;
  user_id?: number;
  recommended?: boolean;
}

interface Response {
  results: CustomMusicList[];
  count: number;
}

const useGetMusicList = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [count, setCount] = useState(0)

  const fetchMusicList = async ({
    successCallback,
    limit,
    offset,
    is_pinned,
    is_me,
    user_id,
    loading_type,
    recommended,
  }: Params) => {
    setLoading(loading_type ?? LoadingType.FETCH);
    try {
      const { data } = await getUserMusicList({
        limit: limit ?? 10,
        offset: offset ?? 0,
        ...(typeof is_pinned === 'boolean' ? {is_pinned} : {}),
        ...(typeof is_me === 'boolean' ? {is_me} : {}),
        ...(typeof recommended === 'boolean' ? {recommended} : {}),
        user_id
      });
      setCount(data.count);
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

  return { count, loading, fetchMusicList };
};

export default useGetMusicList;

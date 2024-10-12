import { useState } from 'react';
import { getSearchData } from 'shared/core/services/api/user/user';
import {
  LoadingType,
  SORTED_BY_FILTERS,
  SpotifySearchResponse,
} from 'shared/types';

interface Params {
  successCallback?: (data: SpotifySearchResponse) => void;
  query_param: string;
  years_filter?: number | null;
  sorted_by_filter?: SORTED_BY_FILTERS | null;
}

const useSearchMusic = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const fetchData = async ({
    successCallback,
    query_param,
    years_filter,
    sorted_by_filter,
  }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const params = {
        query_param,
        ...(sorted_by_filter ? { sort_by: sorted_by_filter } : {}),
        ...(years_filter ? { release_year: years_filter } : {}),
      };
      const { data } = await getSearchData(params);
      if (successCallback) {
        successCallback(data as SpotifySearchResponse);
      }
      return data as SpotifySearchResponse;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchData };
};

export default useSearchMusic;

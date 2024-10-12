import { useState } from 'react';
import { setCustomMusicTracks } from 'shared/core/services/api/user/user';
import { CustomMusicTrack, LoadingType } from 'shared/types';

interface Params {
  successCallback?: (data: CustomMusicTrack[]) => void;
  id: number | string;
  props: CustomMusicTrack[];
}

const useUpdateCustomMusicTracks = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const setCustomTracks = async ({ successCallback, props, id }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await setCustomMusicTracks(id, props);
      if (successCallback) {
        successCallback(data as CustomMusicTrack[]);
      }
      return data as CustomMusicTrack[];
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, setCustomTracks };
};

export default useUpdateCustomMusicTracks;

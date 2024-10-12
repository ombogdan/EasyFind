import { getAuthUserActivity } from 'shared/core/services/api/user/user';
import { Activity } from 'shared/types';

interface Params {
  successesCalback?: (data: Response) => void;
  errorCalback?: () => void;
  limit?: number;
  offset?: number;
}

interface Response {
  count: number;
  results: Activity[];
}

const useFetchAuthActivity = () => {
  const fetchActivity = async (props?: Params) => {
    try {
      const { data } = await getAuthUserActivity({
        limit: props?.limit ?? 10,
        offset: props?.offset ?? 0,
      });
      if (props?.successesCalback) {
        props.successesCalback(data as Response);
      }
      return data as Response;
    } catch (error) {
      if (props?.errorCalback) {
        props.errorCalback();
      }
    }
  };

  return { fetchActivity };
};

export default useFetchAuthActivity;

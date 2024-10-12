import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useFetchAuthActivity } from 'shared/hooks/api';
import { useTypedDispatch } from 'shared/store';
import { useFocusEffect } from '@react-navigation/native';
import {
  activityDataSelector,
  activityLoadingSelector,
  activityActions,
} from 'shared/store/slices/activity';
import { LoadingType } from 'shared/types';
import { groupActivity } from './activity.data';

const useActivity = () => {
  const activity = useSelector(activityDataSelector);
  const loading = useSelector(activityLoadingSelector);
  const dispatch = useTypedDispatch();
  const { fetchActivity } = useFetchAuthActivity();

  const fetchInitData = async (loadType: LoadingType) => {
    dispatch(activityActions.setLoading(loadType));
    await fetchActivity({
      limit: 50,
      successesCalback: (data) => {
        dispatch(activityActions.setActivityData(data.results));
      },
    });
    dispatch(activityActions.setLoading(LoadingType.COMPLETE));
  };

  const filteredSections = groupActivity(activity).filter(
    (section) => section.data.length > 0,
  );

  const onRefresh = () => fetchInitData(LoadingType.REFRESH);

  useFocusEffect(
    useCallback(() => {
      fetchInitData(LoadingType.FETCH);
    }, []),
  );

  return {
    is_refreshing: loading === LoadingType.REFRESH,
    loading: loading === LoadingType.FETCH && activity.length === 0,
    filteredSections,
    onRefresh,
  };
};

export default useActivity;

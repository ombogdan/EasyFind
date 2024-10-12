import { useEffect, useState } from 'react';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { AuthData, FollowerParamActionType, LoadingType } from 'shared/types';
import { useFetchFollowers } from 'shared/hooks/api';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'shared/store/slices/user';

const LIMIT = 20;

const useFollowersList = (activeTab: FollowerParamActionType) => {
  const { params } = useAppRoute<AppUserRoutes.Followers>();
  const [followers, setFollowers] = useState<AuthData[]>([]);
  const { loading, fetchFollowers } = useFetchFollowers();
  const [total, setTotal] = useState(0);
  const currentUser = useSelector(userDataSelector);

  const is_me = currentUser?.id === params.user_id;
  const emptyMessage = `You will see all the people who follow ${is_me ? 'you' : params.username} here`

  const fetchInitialFollowers = () => {
    fetchFollowers({
      successCallback: (data) => {
        setTotal(data.count);
        setFollowers(data.results);
      },
      user_id: params.user_id,
      limit: LIMIT,
    });
  };

  const fetchMoreFollowing = () => {
    fetchFollowers({
      successCallback: (data) => {
        setFollowers((prev) => [...prev, ...data.results]);
      },
      user_id: params.user_id,
      limit: LIMIT,
      offset: followers.length,
      loading_type: LoadingType.FETCH_MORE,
    });
  };

  useEffect(() => {
    if (params.action === FollowerParamActionType.FOLLOWERS) {
      fetchInitialFollowers();
    }
  }, [params]);

  useEffect(() => {
    if (
      activeTab === FollowerParamActionType.FOLLOWERS &&
      followers.length === 0
    ) {
      fetchInitialFollowers();
    }
  }, [activeTab]);

  const followCallback = (user_id: number) => {
    setFollowers((prev) =>
      prev.map((i) =>
        i.id !== user_id ? i : { ...i, is_followed_by_me: true },
      ),
    );
  };

  const followDeleteCallback = (user_id: number) => {
    setFollowers((prev) =>
      prev.map((i) =>
        i.id !== user_id ? i : { ...i, is_followed_by_me: false },
      ),
    );
  };

  const onEndReached = () => {
    if (loading === LoadingType.FETCH || loading === LoadingType.FETCH_MORE) {
      return;
    }
    if (total === 0 || total === followers.length) {
      return;
    }
    fetchMoreFollowing();
  };

  return {
    onEndReached,
    followDeleteCallback,
    followCallback,
    loading,
    followers,
    emptyMessage
  };
};

export default useFollowersList;

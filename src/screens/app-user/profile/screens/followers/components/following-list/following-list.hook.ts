import { useEffect, useState } from 'react';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { AuthData, FollowerParamActionType, LoadingType } from 'shared/types';
import useFetchFollowing from 'shared/hooks/api/following/useFetchFollowing';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'shared/store/slices/user';

const LIMIT = 20;

const useFollowingList = (activeTab: FollowerParamActionType) => {
  const currentUser = useSelector(userDataSelector);
  const { params } = useAppRoute<AppUserRoutes.Followers>();
  const { loading, fetchFollowing } = useFetchFollowing();
  const [following, setFollowing] = useState<AuthData[]>([]);
  const [total, setTotal] = useState(0);

  const is_me = currentUser?.id === params.user_id;
  const emptyMessage = `When ${is_me ? 'you' : params.username} follow people, you will see them here`

  const fetchInitialFollowing = () => {
    fetchFollowing({
      successCallback: (data) => {
        setTotal(data.count);
        setFollowing(data.results);
      },
      user_id: params.user_id,
      limit: LIMIT,
    });
  };

  const fetchMoreFollowing = () => {
    fetchFollowing({
      successCallback: (data) => {
        setFollowing((prev) => [...prev, ...data.results]);
      },
      user_id: params.user_id,
      limit: LIMIT,
      offset: following.length,
      loading_type: LoadingType.FETCH_MORE,
    });
  };

  useEffect(() => {
    if (params.action === FollowerParamActionType.FOLLOWING) {
      fetchInitialFollowing();
    }
  }, [params]);

  useEffect(() => {
    if (
      activeTab === FollowerParamActionType.FOLLOWING &&
      following.length === 0
    ) {
      fetchInitialFollowing();
    }
  }, [activeTab]);

  const followCallback = (user_id: number) => {
    setFollowing((prev) =>
      prev.map((i) =>
        i.id !== user_id ? i : { ...i, is_followed_by_me: true },
      ),
    );
  };

  const followDeleteCallback = (user_id: number) => {
    setFollowing((prev) =>
      prev.map((i) =>
        i.id !== user_id ? i : { ...i, is_followed_by_me: false },
      ),
    );
  };

  const onEndReached = () => {
    if (loading === LoadingType.FETCH || loading === LoadingType.FETCH_MORE) {
      return;
    }
    if (total === 0 || total === following.length) {
      return;
    }
    fetchMoreFollowing();
  };
  return { onEndReached, followDeleteCallback, followCallback, loading, following, emptyMessage };
};

export default useFollowingList;

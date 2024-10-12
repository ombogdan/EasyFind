import React, { useState } from 'react';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useGetMusicList } from 'shared/hooks/api';
import { useFocusEffect } from '@react-navigation/native';
import { CustomMusicList, LoadingType } from 'shared/types';

const useListTab = (user_id?: number) => {
  const { loading, fetchMusicList } = useGetMusicList();
  const [musicList, setMusicList] = useState<CustomMusicList[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  useFocusEffect(
    React.useCallback(() => {
      fetchMusicList({
        is_me: user_id ? undefined : true,
        user_id,
        limit,
        successCallback: (data) => {
          setMusicList(data.results);
          setTotal(data.count);
        },
      });
    }, [user_id]),
  );

  const onPressCreateList = (item?: CustomMusicList) => {
    navigate(AppUserRoutes.ListForm, { item });
  };

  const handleUpdateItem = (item: CustomMusicList) => {
    const updatedList = musicList.map((i) => {
      if (i.id !== item.id) return i;
      return { ...item };
    });
    setMusicList(updatedList);
  };

  const onPressCustomList = (item: CustomMusicList) => () => {
    navigate(AppUserRoutes.CustomListDetails, { item });
  };

  const onPressLoadMore = () => {
    fetchMusicList({
      loading_type: LoadingType.FETCH_MORE,
      is_me: user_id ? true : undefined,
      offset: musicList.length,
      user_id,
      successCallback: (data) => {
        setMusicList((prev) => [...prev, ...data.results]);
        setLimit([...musicList, ...data.results].length);
      },
    });
  };

  return {
    onPressCreateList,
    onPressLoadMore,
    onPressCustomList,
    handleUpdateItem,
    total,
    loading,
    musicList,
  };
};

export default useListTab;

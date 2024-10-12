import { FlatList, View } from 'react-native';
import React from 'react';
import { SCREEN_WIDTH } from 'shared/constants';
import { FollowerParamActionType, LoadingType } from 'shared/types';
import { FollowerCard } from 'shared/components/follower-card';
import { Loader } from '../loader';
import { useStyles } from './following-list.styles';
import useFollowingList from './following-list.hook';
import { EmptyList } from '../empty-list';

interface Props {
  activeTab: FollowerParamActionType;
}

const FollowingList = ({ activeTab }: Props) => {
  const styles = useStyles();
  const {
    onEndReached,
    followDeleteCallback,
    followCallback,
    loading,
    following,
    emptyMessage,
  } = useFollowingList(activeTab);

  return (
    <View style={{ width: SCREEN_WIDTH }}>
      <Loader isLoading={loading === LoadingType.FETCH} />
      {loading === LoadingType.COMPLETE && following.length === 0 && (
        <EmptyList text={emptyMessage} />
      )}
      <FlatList
        data={following}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id.toLocaleString()}
        ListFooterComponent={
          <Loader isLoading={loading === LoadingType.FETCH_MORE} />
        }
        renderItem={({ item }) => (
          <FollowerCard
            followCallback={followCallback}
            followDeleteCallback={followDeleteCallback}
            user={item}
          />
        )}
      />
    </View>
  );
};

export default FollowingList;

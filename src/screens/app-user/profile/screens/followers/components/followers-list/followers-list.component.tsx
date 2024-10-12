import { FlatList, View } from 'react-native';
import React from 'react';
import { SCREEN_WIDTH } from 'shared/constants';
import { FollowerParamActionType, LoadingType } from 'shared/types';
import { FollowerCard } from 'shared/components/follower-card';
import { Loader } from '../loader';
import { useStyles } from './followers-list.styles';
import useFollowersList from './followers-list.hook';
import { EmptyList } from '../empty-list';

interface Props {
  activeTab: FollowerParamActionType;
}

const FollowersList = ({ activeTab }: Props) => {
  const styles = useStyles();
  const {
    onEndReached,
    followDeleteCallback,
    followCallback,
    loading,
    followers,
    emptyMessage,
  } = useFollowersList(activeTab);

  return (
    <View style={{ width: SCREEN_WIDTH }}>
      <Loader isLoading={loading === LoadingType.FETCH} />
      {loading === LoadingType.COMPLETE && followers.length === 0 && (
        <EmptyList text={emptyMessage} />
      )}
      <FlatList
        data={followers}
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

export default FollowersList;

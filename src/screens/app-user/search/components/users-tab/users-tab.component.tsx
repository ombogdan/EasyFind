import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { FollowerCard } from 'shared/components/follower-card';
import {
  searchActiveTabSelector,
  searchUserResultSelector,
  searchUsersSelector,
} from 'shared/store/slices/search';
import { SearchTab } from 'shared/types';
import { useStyles } from './users-tab.styles';
import { SearchEmpty } from '../search-empty';

const UsersTab = () => {
  const styles = useStyles();
  const users = useSelector(searchUsersSelector);
  const active_tab = useSelector(searchActiveTabSelector);
  const is_empty_result = useSelector(searchUserResultSelector);

  if (active_tab !== SearchTab.USERS) {
    return null;
  }

  return (
    <View style={styles.container}>
      {users?.map((user) => (
        <FollowerCard key={user.id} user={user} />
      ))}
      {is_empty_result && <SearchEmpty />}
    </View>
  );
};

export default UsersTab;

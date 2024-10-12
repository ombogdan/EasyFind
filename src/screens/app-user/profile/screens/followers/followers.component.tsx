import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { Header } from 'shared/components/header';
import { OutlineTabs } from 'shared/components/outline-tabs';
import { FollowerParamActionType } from 'shared/types';
import { SCREEN_WIDTH } from 'shared/constants';
import { useStyles } from './followers.styles';
import { FollowersTabs } from './followers.types';
import { FollowingList } from './components/following-list';
import { FollowersList } from './components/followers-list';

const Followers = () => {
  const styles = useStyles();
  const { params } = useAppRoute<AppUserRoutes.Followers>();

  const scrollRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(
    params.action || FollowerParamActionType.FOLLOWERS,
  );

  const onChangeTab = (action: FollowerParamActionType) => {
    if (action === activeTab) return;
    setActiveTab(action);
    if (action === FollowerParamActionType.FOLLOWERS) {
      scrollRef.current?.scrollTo({ x: -SCREEN_WIDTH * 2 });
    } else {
      scrollRef.current?.scrollTo({ x: SCREEN_WIDTH * 2 });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton name={params?.username} />
      {/* TABS */}
      <OutlineTabs
        onChangeTab={(action) => onChangeTab(action as FollowerParamActionType)}
        actions={FollowersTabs}
        activeTab={activeTab}
      />
      <ScrollView
        ref={scrollRef}
        scrollEnabled={false}
        decelerationRate="fast"
        horizontal
        contentOffset={{
          // set initial scroll
          x:
            params.action === FollowerParamActionType.FOLLOWING
              ? SCREEN_WIDTH * 2
              : 0,
          y: 0,
        }}
      >
        {/* FOLLOWER LIST */}
        <FollowersList activeTab={activeTab} />
        {/* FOLLOWING LIST */}
        <FollowingList activeTab={activeTab} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Followers;

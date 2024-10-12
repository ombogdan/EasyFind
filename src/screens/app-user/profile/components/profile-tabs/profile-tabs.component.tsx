import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SCREEN_WIDTH, SIZE } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { Tabs } from 'shared/components/tabs';
import {
  PROFILE_TABS,
  ProfileTabs as ProfileTabsType,
} from '../../profile.types';
import { HomeTab } from '../home-tab';
import { ReviewTab } from '../review-tab';
import { ListTab } from '../list-tab';

const styles = StyleSheet.create({
  tabContainer: {
    height: 0,
    opacity: 0,
  },
});

const ProfileTabs = ({ public_user_id }: { public_user_id?: number }) => {
  const [activeTab, setActiveTab] = useState(ProfileTabsType.HOME);
  const translateXAnim = useSharedValue<number>(0);
  const [loading, setLoading] = useState(true);

  const onLoading = () => setLoading(false);

  const handlePressTab = (key: string | number) => {
    if (key === ProfileTabsType.HOME) {
      translateXAnim.value = withTiming(0);
    }
    if (key === ProfileTabsType.REVIEW) {
      translateXAnim.value = withTiming(-SCREEN_WIDTH);
    }
    if (key === ProfileTabsType.LIST) {
      translateXAnim.value = withTiming(-(SCREEN_WIDTH * 2));
    }
    setActiveTab(key as ProfileTabsType);
  };

  const style = useAnimatedStyle(() => ({
    flexDirection: 'row',
    transform: [{ translateX: translateXAnim.value }],
  }));

  return (
    <View>
      {/* PROFILE TABS */}
      <Box pl={16} pr={16} pt={SIZE.x3l}>
        {!loading && <Tabs
          active_tab={activeTab}
          actions={PROFILE_TABS}
          handlePressTab={handlePressTab}
        />}
      </Box>
      <Animated.View style={style}>
        {/* HOME TAB */}
        <View
          style={activeTab !== ProfileTabsType.HOME ? styles.tabContainer : {}}
        >
          <HomeTab onLoading={onLoading} public_user_id={public_user_id} />
        </View>
        {/* REVIEW TAB */}
        <View
          style={
            activeTab !== ProfileTabsType.REVIEW ? styles.tabContainer : {}
          }
        >
          <ReviewTab user_id={public_user_id} />
        </View>
        {/* LIST TAB */}
        <View
          style={activeTab !== ProfileTabsType.LIST ? styles.tabContainer : {}}
        >
          <ListTab user_id={public_user_id}/>
        </View>
      </Animated.View>
    </View>
  );
};

export default ProfileTabs;

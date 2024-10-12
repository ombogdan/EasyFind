import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Title } from 'shared/ui-kit/title';
import { Tabs } from 'shared/components/tabs';
import { Box } from 'shared/ui-kit/box';
import { SIZE } from 'shared/constants';
import { EntityCard } from 'shared/components/entity-card';
import { homePopularSelector, homeReleasesSelector } from 'shared/store/slices/home';
import { useSelector } from 'react-redux';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { SpotifyMediaType } from 'shared/types';

enum ReleaseTabType {
  POPULAR = 'Popular',
  NEW = 'New',
}

const ReleaseTabs = [
  { key: ReleaseTabType.POPULAR, label: ReleaseTabType.POPULAR },
  { key: ReleaseTabType.NEW, label: ReleaseTabType.NEW },
];

const HotRelease = () => {
  const releases = useSelector(homeReleasesSelector);
  const popular = useSelector(homePopularSelector);

  const [activeTab, setActiveTab] = useState(ReleaseTabType.POPULAR);

  const onPressEntity = (id: string, type: SpotifyMediaType) => () => {
    switch (type) {
      case 'albums':
        navigate(AppUserRoutes.TrackDetail, { id });
        break;
      case 'artists':
        navigate(AppUserRoutes.ArtistDetail, { id });
        break;
      case 'tracks':
        navigate(AppUserRoutes.TrackDetail, { id, isTrack: true });
        break;
      default:
        break;
    }
  };

  const onChangeTab = (key: string | number) => {
    setActiveTab(key as ReleaseTabType);
  };

  return (
    <View>
      <Box ml={SIZE.md} mr={SIZE.md}>
        <Title text="Hot Releases" />
        <Box mt={SIZE.md}>
          <Tabs
            handlePressTab={onChangeTab}
            actions={ReleaseTabs}
            active_tab={activeTab}
          />
        </Box>
      </Box>
      <Box mt={SIZE.md}>
        {activeTab === ReleaseTabType.NEW && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: SIZE.sm,
              paddingHorizontal: SIZE.md,
            }}
            horizontal
          >
            {releases.map((i) => (
              <TouchableOpacity
                key={i.id}
                activeOpacity={0.5}
                onPress={onPressEntity(i.id, i.type_object)}
              >
                <EntityCard
                  key={i.id}
                  name={i.name}
                  uri={i.image[0].url}
                  rate={i.averageRating}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeTab === ReleaseTabType.POPULAR && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: SIZE.sm,
              paddingHorizontal: SIZE.md,
            }}
            horizontal
          >
            {popular.map((i) => (
              <TouchableOpacity
                key={i.id}
                activeOpacity={0.5}
                onPress={onPressEntity(i.id, i.type_object)}
              >
                <EntityCard
                  key={i.id}
                  name={i.name}
                  uri={i.image[0].url}
                  rate={i.averageRating}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </Box>
    </View>
  );
};

export default HotRelease;

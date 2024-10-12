import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Box } from 'shared/ui-kit/box';
import { Title } from 'shared/ui-kit/title';
import { RatingChart } from 'shared/components/rating-chart';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { EntityCard } from 'shared/components/entity-card';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { CustomMusicCard } from 'shared/components/custom-music-card';
import { useStyles } from './home-tab.styles';
import TabLoading from '../tab-loading';
import useHomeTab from './home-tab.hook';

const HomeTab = ({ public_user_id, onLoading }: { public_user_id?: number, onLoading: () => void }) => {
  const styles = useStyles();
  const {
    onPressAlbum,
    onPressActivity,
    favorite_music,
    activity,
    rating,
    loadingData,
    navigateToList,
    navigateToListDetails,
    handleUpdate,
    pinnedItem,
  } = useHomeTab({user_id: public_user_id, onLoading});

  if (loadingData) {
    return <TabLoading />;
  }

  return (
    <View style={styles.container}>
      {/* FAVORITE ALBUMS */}
      <Box>
        <Box pl={16} pr={16} pt={SIZE.x3l}>
          <Title text="Favorite albums" />
        </Box>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.scrollContainer}
        >
          {favorite_music.map((album) => (
            <TouchableOpacity
              onPress={onPressAlbum(album.object_spotify.id)}
              key={album.id}
              activeOpacity={0.5}
            >
              <EntityCard
                name={album.object_spotify?.name}
                uri={album.object_spotify.image[0].url}
                describe={album.object_spotify.artist}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Box>
      {/* PINNED LISTS */}
      <Box pl={16} pr={16}>
        <Box
          pt={SIZE.x3l}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Title text="Pinned Lists" />
          <CustomButton
            containerStyle={styles.arrowButton}
            variant={BUTTON_VARIANTS.secondary}
            onPress={navigateToList}
            rightIcon="arrow_right_small"
          />
        </Box>
        {pinnedItem.length > 0 && (
          <Box mt={SIZE.md}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={navigateToListDetails}
            >
              <CustomMusicCard
                item={pinnedItem[0]}
                handleUpdate={handleUpdate}
              />
            </TouchableOpacity>
          </Box>
        )}
      </Box>
      {/* RATE */}
      <Box pl={16} pr={16} pt={SIZE.x3l}>
        <Title text="Average Rating" />
        <RatingChart data={rating} />
      </Box>
      {/* ACTIVITY */}
      <Box pl={16} pr={16} pt={SIZE.x3l}>
        <Title text="Recent Activity" />
      </Box>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.scrollContainer}
      >
        {activity.map((ac, index) => (
          <TouchableOpacity
            onPress={onPressActivity(ac.id, ac.type_obj)}
            key={`${ac.id + index}`}
            activeOpacity={0.5}
          >
            <EntityCard
              name={ac.name}
              uri={ac.photo.url}
              rate={+ac.averageRating}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeTab;

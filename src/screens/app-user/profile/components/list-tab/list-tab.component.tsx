import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import {
  BUTTON_VARIANTS,
  LOTTIE_BLACK_LOADER,
  SCREEN_WIDTH,
  SIZE,
} from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { LoadingType } from 'shared/types';
import LottieView from 'lottie-react-native';
import { CustomMusicCard } from 'shared/components/custom-music-card';
import { useStyles } from './list-tab.styles';
import TabLoading from '../tab-loading';
import { ListTabEmpty } from '../list-tab-empty';
import useListTab from './list-tab.hook';

const ListTab = ({ user_id }: { user_id?: number }) => {
  const styles = useStyles();
  const {
    onPressCreateList,
    onPressLoadMore,
    onPressCustomList,
    handleUpdateItem,
    total,
    loading,
    musicList,
  } = useListTab(user_id);

  if (loading === LoadingType.FETCH && musicList.length === 0) {
    return <TabLoading />;
  }

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
      }}
    >
      {/* LIST EMPTY */}
      {musicList.length === 0 && !user_id && <ListTabEmpty />}
      {/* CUSTOM LiST */}
      {musicList.length > 0 && (
        <View>
          {!user_id && (
            <Box pt={SIZE.x3l} pl={SIZE.md} pr={SIZE.md}>
              <CustomButton
                variant={BUTTON_VARIANTS.secondary}
                onPress={onPressCreateList}
                title="Create a new list"
              />
            </Box>
          )}
          <Box pl={SIZE.md} pr={SIZE.md} pt={SIZE.x3l}>
            {musicList.map((item) => (
              <TouchableOpacity
                onPress={onPressCustomList(item)}
                activeOpacity={0.5}
                key={item.id}
              >
                <Box mb={SIZE.md} key={item.id}>
                  <CustomMusicCard
                    item={item}
                    handleUpdate={handleUpdateItem}
                  />
                </Box>
              </TouchableOpacity>
            ))}
          </Box>
          {/* LOAD MORE */}
          {loading === LoadingType.COMPLETE && musicList.length !== total && (
            <Box pl={SIZE.md} pr={SIZE.md} mt={SIZE.md}>
              <TouchableOpacity activeOpacity={0.5} onPress={onPressLoadMore}>
                <Text style={styles.loadMoreText}>View more lists</Text>
              </TouchableOpacity>
            </Box>
          )}
          {loading === LoadingType.FETCH_MORE && (
            <Box alignItems="center">
              <LottieView
                style={{
                  height: 150,
                  width: 150,
                }}
                source={LOTTIE_BLACK_LOADER}
                autoPlay
                loop
              />
            </Box>
          )}
        </View>
      )}
    </View>
  );
};

export default ListTab;

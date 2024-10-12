import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Title } from 'shared/ui-kit/title';
import { Box } from 'shared/ui-kit/box';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { useGetMusicList } from 'shared/hooks/api';
import { CustomMusicCard } from 'shared/components/custom-music-card';
import { CustomMusicList } from 'shared/types';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { navigate } from 'shared/navigation/root-navigator.config';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { useStyles } from './recommended-list.styles';

const RecommendedList = () => {
  const styles = useStyles();
  const [customListItem, setCustomListItem] = useState<CustomMusicList | null>(
    null,
  );

  const { fetchMusicList } = useGetMusicList();

  useEffect(() => {
    fetchMusicList({
      limit: 1,
      recommended: true,
      successCallback: (data) => setCustomListItem(data.results[0] || null),
    });
  }, []);

  const handleUpdateItem = (item: CustomMusicList) => {
    setCustomListItem(item);
  };

  const onPressCustomList = (item: CustomMusicList) => () => {
    navigate(AppUserRoutes.CustomListDetails, { item });
  };

  const navigateToList = () => {
    navigate(AppUserRoutes.PinnedList, { recommended: true });
  };

  return (
    <View>
      <Box mt={SIZE.xl} ml={SIZE.md} mr={SIZE.md}>
        <Box direction="row" justifyContent="space-between" alignItems="center">
          <Title text="Recommended List" />
          {customListItem && (
            <CustomButton
              containerStyle={styles.arrowButton}
              variant={BUTTON_VARIANTS.secondary}
              onPress={navigateToList}
              rightIcon="arrow_right_small"
            />
          )}
        </Box>
        {customListItem && (
          <Box mt={SIZE.md}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressCustomList(customListItem)}
            >
              <CustomMusicCard
                item={customListItem}
                handleUpdate={handleUpdateItem}
              />
            </TouchableOpacity>
          </Box>
        )}
      </Box>
    </View>
  );
};

export default RecommendedList;

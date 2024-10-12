import { SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  profileActions,
  profileCustomListIdSelector,
  profileSelectedMusicSelector,
} from 'shared/store/slices/profile';
import { MediaCard } from 'shared/components/media-card';
import { Shadow } from 'shared/ui-kit/shadow';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { goBack, navigate } from 'shared/navigation/root-navigator.config';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { Box } from 'shared/ui-kit/box';
import CustomInput from 'shared/ui-kit/custom-input/custom-input.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { userDataSelector } from 'shared/store/slices/user';
import { useUpdateCustomMusicTracks } from 'shared/hooks/api';
import { useTypedDispatch } from 'shared/store';
import { useStyles } from './custom-list-music.styles';

const CustomListMusic = () => {
  const insets = useSafeAreaInsets();
  const selected_music = useSelector(profileSelectedMusicSelector);
  const { params } = useAppRoute<AppUserRoutes.CustomListMusic>();
  const update_id = useSelector(profileCustomListIdSelector);
  const dispatch = useTypedDispatch();
  const user = useSelector(userDataSelector);
  const { loading: loadingTracks, setCustomTracks } =
    useUpdateCustomMusicTracks();
  const styles = useStyles({ insets });

  const canDelete = !params?.user_id || user.id === params?.user_id;

  const goToSearchMusic = () => {
    navigate(AppUserRoutes.SearchMusic);
  };

  const onPresDelete = (id: string | number) => () => {
    if (update_id) {
      dispatch(profileActions.removeSelectedMusic(id));
      setCustomTracks({
        id: update_id,
        props: selected_music.filter((i) => i.id !== id),
      });
      return;
    }
    dispatch(profileActions.removeSelectedMusic(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Box>
          <CustomButton
            containerStyle={{ height: 40, width: 40 }}
            variant={BUTTON_VARIANTS.secondary}
            onPress={goBack}
            rightIcon="backIcon"
          />
        </Box>
        {canDelete && (
          <Box flex={0.95}>
            <TouchableOpacity activeOpacity={0.5} onPress={goToSearchMusic}>
              <CustomInput
                value=""
                editable={false}
                onChangeValue={() => {}}
                search
                placeholder="Add music to the list"
                leftIcon="search_loupe"
              />
            </TouchableOpacity>
          </Box>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {selected_music.map((i) => (
          <View key={i.id}>
            <Shadow radius={SIZE.md} />
            <Box
              direction="row"
              alignItems="center"
              style={styles.itemContainer}
            >
              <MediaCard
                key={i.id}
                title={i.object_spotify.name}
                uri={i.object_spotify.image[0].url}
                name={i.object_spotify.artist}
              />
              {canDelete && (
                <View
                  style={{
                    right: 10,
                  }}
                >
                  <CustomButton
                    containerStyle={{ width: 42 }}
                    variant={BUTTON_VARIANTS.primary}
                    onPress={onPresDelete(i.id)}
                    rightIcon="delete"
                  />
                </View>
              )}
            </Box>
          </View>
        ))}
      </ScrollView>
      {canDelete && <View style={styles.buttonContainer}>
        <CustomButton
          variant={BUTTON_VARIANTS.primary}
          onPress={goBack}
          title="Done"
        />
      </View>}
    </SafeAreaView>
  );
};

export default CustomListMusic;

import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header } from 'shared/components/header';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { Title } from 'shared/ui-kit/title';
import CustomInput from 'shared/ui-kit/custom-input/custom-input.component';
import { CustomButton } from 'shared/ui-kit/custom-button';
import {
  useDeleteAvatar,
  useFetchFavoriteMusic,
  useUpdateAvatar,
  useUpdateFavoriteMusic,
  useUpdateProfile,
} from 'shared/hooks/api';
import { goBack, navigate } from 'shared/navigation/root-navigator.config';
import { CustomMusicTrack, LoadingType } from 'shared/types';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { userActions, userDataSelector } from 'shared/store/slices/user';
import { useTypedDispatch } from 'shared/store';
import {
  profileActions,
  profileFavoriteMusicSelector,
} from 'shared/store/slices/profile';
import { MediaCard } from 'shared/components/media-card';
import { Shadow } from 'shared/ui-kit/shadow';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import { AppIcon } from 'shared/assets';
import { useTheme } from 'shared/theme/ThemeProvider';
import useImagePicker from 'shared/hooks/image-picker/image-piker.hook';
import { useStyles } from './edit-profile.styles';

const EditProfile = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const dispatch = useTypedDispatch();
  const auth_data = useSelector(userDataSelector);
  const { pickImage } = useImagePicker();
  const { loading: loadingUpdateAvatar, updateAvatar } = useUpdateAvatar();
  const { deleteAvatar, loading: loadingDeleteAvatar } = useDeleteAvatar();
  const [username, setUsername] = useState('');
  const [full_name, setFullname] = useState('');
  const [bio, setBio] = useState('');
  const [instagram_link, setLinkToInstagram] = useState('');
  const { loading, updateProfile } = useUpdateProfile();
  const { fetchFavoriteMusic } = useFetchFavoriteMusic(auth_data.id);
  const favorite_music = useSelector(profileFavoriteMusicSelector);

  const [validField, setValidField] = useState({
    username: true,
    full_name: true,
  });

  const { loading: loadingDelete, editFavoriteMusic } =
    useUpdateFavoriteMusic();

  const loadingAvatar =
    loadingUpdateAvatar === LoadingType.FETCH ||
    loadingDeleteAvatar === LoadingType.FETCH;

  const setInitialData = () => {
    setUsername(auth_data?.username || '');
    setFullname(auth_data?.full_name || '');
    setBio(auth_data?.bio || '');
    setLinkToInstagram(auth_data?.instagram_link || '');
    fetchFavoriteMusic((data) => dispatch(profileActions.setFavoriteMusicList(data)))
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const onPressSearchMusic = () => {
    dispatch(profileActions.setIsSelectFavorite(true));
    navigate(AppUserRoutes.SearchMusic);
  };

  const validateRequiredFields = () => {
    const validName = !!full_name.trim().length;
    const validUserName = !!username.trim().length;
    setValidField({
      username: validUserName,
      full_name: validName,
    });
    return validName && validUserName;
  };

  const onPressSave = () => {
    if (!validateRequiredFields()) {
      return;
    }
    updateProfile({
      successCallback: () => {
        goBack();
        dispatch(
          userActions.setUserData({ username, full_name, bio, instagram_link }),
        );
      },
      params: {
        username,
        full_name,
        bio,
        instagram_link,
      },
    });
  };

  const onPresDeleteFavorite = (item: CustomMusicTrack) => () => {
    if (loading === LoadingType.FETCH) {
      return;
    }
    editFavoriteMusic({
      successCallback: (data) => {
        dispatch(profileActions.setFavoriteMusicList(data));
      },
      props: favorite_music
        .filter((i) => i.id !== item.id)
        .map((i, idx) => ({ ...i, order_no: idx })),
    });
  };

  const handlePickImage = () => {
    pickImage().then((res) => {
      if (!res) return;
      const { filename, mime, path } = res;
      const formData = new FormData();
      formData.append('avatar', {
        uri: path,
        name: filename || 'photo.jpg',
        type: mime || 'image/jpeg',
      });
      updateAvatar({
        avatar: formData,
        successCallback: (data) => {
          dispatch(userActions.setUserData(data));
        },
      });
    });
  };

  const onDeleteAvatar = () => {
    deleteAvatar(() => dispatch(userActions.setUserData({ avatar: null })));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        backButton
        name="Edit Profile"
        leftButtonText="Save"
        leftIsLoading={loading === LoadingType.FETCH}
        onPressLeftButton={onPressSave}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZE.md,
          paddingBottom: SIZE.xl,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'ios' ? 50 : 50}
      >
        {/* USER AVATAR */}
        <Box
          pt={SIZE.lg}
          pb={SIZE.lg}
          alignItems="center"
          style={{
            borderBottomWidth: 1,
            borderColor: '#DCD6D6',
          }}
        >
          <TouchableOpacity
            disabled={loadingAvatar}
            activeOpacity={0.5}
            onPress={handlePickImage}
          >
            {loadingAvatar && (
              <Box
                justifyContent="center"
                alignItems="center"
                style={styles.avatarLoading}
              >
                <ActivityIndicator size="large" color={theme.palette.dark} />
              </Box>
            )}
            {auth_data?.avatar && (
              <View style={styles.avatarDeleteIcon}>
                <TouchableOpacity
                  disabled={loadingAvatar}
                  activeOpacity={0.5}
                  onPress={onDeleteAvatar}
                >
                  <AppIcon name="delete" color="danger" />
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                opacity: loadingAvatar ? 0.5 : 1,
              }}
            >
              <ProfilePicture
                width={100}
                height={100}
                uri={auth_data?.avatar || null}
              />
            </View>
          </TouchableOpacity>
          {!auth_data?.avatar && (
            <Box pt={SIZE.md}>
              <Title text="Add Profile Picture" />
            </Box>
          )}
        </Box>
        {/* USERNAME */}
        <Box mt={SIZE.xl}>
          <CustomInput
            value={username}
            onChangeValue={(text) => {
              setValidField({
                ...validField,
                username: true,
              });
              setUsername(text);
            }}
            maxLength={256}
            placeholder="Username*"
            errorMessage={validField.username ? null : 'Required field'}
            name="Username"
          />
        </Box>
        {/* NAME */}
        <Box mt={SIZE.md}>
          <CustomInput
            value={full_name}
            onChangeValue={(text) => {
              setValidField({
                ...validField,
                full_name: true,
              });
              setFullname(text);
            }}
            maxLength={256}
            placeholder="Name*"
            errorMessage={validField.full_name ? null : 'Required field'}
            name="Name"
          />
        </Box>
        {/* BIO */}
        <Box mt={SIZE.md}>
          <CustomInput
            value={bio}
            onChangeValue={setBio}
            maxLength={1024}
            multiline
            styleInput={{
              height: 116,
            }}
            placeholder="Short Bio"
            name="Short Bio"
          />
        </Box>
        {/* EMAIL */}
        <Box
          style={{
            marginTop: 85,
          }}
        >
          <CustomInput
            editable={false}
            value={auth_data?.email || ''}
            onChangeValue={() => {}}
            maxLength={256}
            name="Email"
          />
        </Box>
        {/* LINK */}
        <Box mt={SIZE.md}>
          <CustomInput
            value={instagram_link}
            onChangeValue={setLinkToInstagram}
            maxLength={256}
            placeholder="Link to Instagram"
            name="Link to Instagram"
          />
        </Box>
        <Box pt={SIZE.xl}>
          <Title text="Your favorite albums" />
        </Box>
        <Box
          mt={SIZE.md}
          style={{
            gap: SIZE.sm,
            opacity: loadingDelete === LoadingType.FETCH ? 0.5 : 1,
          }}
        >
          {favorite_music.map((i) => (
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
                  uri={
                    i.object_spotify?.image?.length
                      ? i.object_spotify.image[0].url
                      : ''
                  }
                  name={
                    typeof i.object_spotify.artist === 'string'
                      ? i.object_spotify.artist
                      : ''
                  }
                />
                <View
                  style={{
                    right: 10,
                  }}
                >
                  <CustomButton
                    containerStyle={{ width: 42 }}
                    variant={BUTTON_VARIANTS.primary}
                    onPress={onPresDeleteFavorite(i)}
                    rightIcon="delete"
                  />
                </View>
              </Box>
            </View>
          ))}
        </Box>
        {favorite_music.length !== 5 && (
          <Box mt={SIZE.xl}>
            <CustomButton
              variant={BUTTON_VARIANTS.primary}
              onPress={onPressSearchMusic}
              title="Add Album"
            />
          </Box>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from 'shared/components/header';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import CustomInput from 'shared/ui-kit/custom-input/custom-input.component';
import { Title } from 'shared/ui-kit/title';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from 'shared/theme/ThemeProvider';
import { useScale } from 'shared/hooks/useScale';
import { Shadow } from 'shared/ui-kit/shadow';
import { CustomMusicIcon } from 'shared/components/custom-music-icon';
import { useStyles } from './list-form.styles';
import useListForm from './list-form.hook';
import { CustomListDeleteModal } from '../profile/components/custom-list-delete-modal';

const ListForm = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insets });
  const { theme } = useTheme();
  const scale = useScale();
  const {
    checkbox,
    onPressCheckbox,
    name,
    describe,
    setDescribe,
    onPressSave,
    isLoading,
    isCreate,
    handleDeleteCustomMusic,
    onOpenDeleteModal,
    onCloseDeleteModal,
    visibleDelete,
    selected_music,
    onPressSearchMusic,
    goToMusicList,
    validation,
    onChangeName,
  } = useListForm();

  return (
    <View style={styles.container}>
      <Header
        name={isCreate ? 'Create List' : 'Update list'}
        backButton
        leftIcon={isCreate ? undefined : 'dots'}
        onPressLeftButton={onOpenDeleteModal}
      />
      <ScrollView contentContainerStyle={styles.listContainer}>
        <Box mt={SIZE.xl} pr={SIZE.md} pl={SIZE.md}>
          <Title text="Information" />
          {/* NAME */}
          <Box mt={SIZE.sm}>
            <CustomInput
              value={name}
              errorMessage={validation.title ? '' : '0'}
              errorMessageStyles={{
                opacity: 0,
              }}
              styleContainer={styles.nameContainer}
              onChangeValue={onChangeName}
              maxLength={100}
              placeholder="Title"
            />
            {!validation.title && (
              <Box mt={SIZE.x2s}>
                <Text style={styles.errorText}>Required field</Text>
              </Box>
            )}
          </Box>
          {/* DESCRIPTION */}
          <Box mt={SIZE.sm}>
            <CustomInput
              value={describe}
              onChangeValue={setDescribe}
              multiline
              styleInput={styles.describe}
              maxLength={1024}
              placeholder="Description"
            />
          </Box>
          {/* CHECKBOX */}
          <Box direction="row" mt={70}>
            <Box flex={0.5}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPressCheckbox('make_public')}
              >
                <View
                  style={[
                    styles.checkboxContainer,
                    checkbox.make_public ? styles.checkboxActive : {},
                  ]}
                >
                  <Box>
                    <BouncyCheckbox
                      size={scale(SIZE.lg)}
                      isChecked={checkbox.make_public}
                      fillColor={theme.palette.dark}
                      unFillColor={theme.palette.secondary}
                      innerIconStyle={{
                        borderWidth: scale(SIZE.xs),
                        borderRadius: scale(SIZE.s),
                      }}
                      iconStyle={{
                        borderRadius: scale(SIZE.s),
                        marginRight: -SIZE.s,
                      }}
                      onPress={onPressCheckbox('make_public')}
                    />
                  </Box>
                  <Text style={styles.checkboxText}>Make as Public</Text>
                </View>
              </TouchableOpacity>
            </Box>
            <Box pl={SIZE.sm} />
            <Box flex={0.5}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPressCheckbox('pinned')}
              >
                <View
                  style={[
                    styles.checkboxContainer,
                    checkbox.pinned ? styles.checkboxActive : {},
                  ]}
                >
                  <View>
                    <BouncyCheckbox
                      size={scale(SIZE.lg)}
                      isChecked={checkbox.pinned}
                      fillColor={theme.palette.dark}
                      unFillColor={theme.palette.secondary}
                      innerIconStyle={{
                        borderWidth: scale(SIZE.xs),
                        borderRadius: scale(SIZE.s),
                      }}
                      iconStyle={{
                        borderRadius: scale(SIZE.s),
                        marginRight: -SIZE.s,
                      }}
                      onPress={onPressCheckbox('pinned')}
                    />
                  </View>
                  <Text style={styles.checkboxText}>Pinned</Text>
                </View>
              </TouchableOpacity>
            </Box>
          </Box>
          {/* MUSIC LIST */}
          <Box mt={SIZE.xl}>
            <Box
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Title text="Music" />
              {selected_music.length > 0 && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPressSearchMusic}
                >
                  <Text style={styles.addMoreText}>Add more</Text>
                </TouchableOpacity>
              )}
            </Box>
            {/* BUTTON ADD MUSIC */}
            {selected_music.length === 0 && (
              <Box mt={SIZE.xl} alignItems="center">
                <View style={styles.addMusicButton}>
                  <CustomButton
                    variant={BUTTON_VARIANTS.primary}
                    onPress={onPressSearchMusic}
                    title="Add music to List"
                    leftIcon="pen_edit"
                    iconSize={28}
                  />
                </View>
              </Box>
            )}
            {/* SELECTED MUSIC LIST */}
            {selected_music.length > 0 && (
              <Box mt={SIZE.md}>
                <Shadow radius={SIZE.md} />
                <View style={styles.musicContainer}>
                  <TouchableOpacity onPress={goToMusicList} activeOpacity={0.5}>
                    <Text style={styles.entryText}>
                      {selected_music.length}{' '}
                      {selected_music.length === 1 ? 'entry' : 'entries'}
                    </Text>
                  </TouchableOpacity>
                  <Box
                    direction="row"
                    mt={SIZE.sm}
                    style={styles.musicListContainer}
                  >
                    {selected_music.slice(0, 8).map((item) => (
                      <CustomMusicIcon
                        key={item.id}
                        uri={item?.object_spotify.image[0].url}
                        title={item.object_spotify.name}
                        describe={item.object_spotify.artist}
                      />
                    ))}
                  </Box>
                </View>
              </Box>
            )}
          </Box>
        </Box>
      </ScrollView>
      {/* BUTTON */}
      <View style={styles.buttonContainer}>
        <CustomButton
          isLoading={isLoading}
          variant={BUTTON_VARIANTS.primary}
          onPress={onPressSave}
          title={isCreate ? 'Create List' : 'Update list'}
          iconSize={28}
        />
      </View>
      {/* DELETE MODAL */}
      <CustomListDeleteModal
        isShowDeleteModal={visibleDelete}
        onCloseModal={onCloseDeleteModal}
        handleConfirmDelete={handleDeleteCustomMusic}
      />
    </View>
  );
};

export default ListForm;

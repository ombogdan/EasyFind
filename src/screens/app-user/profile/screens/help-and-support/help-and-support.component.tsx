import React, { useState } from 'react';
import { Linking, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { userActions } from 'store/slices/user';
import { asyncStorageService } from 'services/async-storage-service';
import { useTypedDispatch } from 'store/index';
import { Header } from 'components/header';
import { Box } from 'ui-kit/box';
import { AppIcon } from 'assets/index';
import { useDeleteAccount } from 'shared/hooks/api';
import { LoadingType } from 'shared/types';
import { SUPPORT_EMAIL } from 'shared/constants';
import { FullScreenLoader } from 'shared/ui-kit/full-screen-loader';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useStyles } from './help-and-support.styles';
import { AccountDeleteModal } from './components/account-delete-modal';

const HelpAndSupport = () => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const { loading, handleDeleteAccount } = useDeleteAccount();

  const handleLogout = async () => {
    dispatch(userActions.userLogout());
    await asyncStorageService.setAccessToken('');
    await asyncStorageService.setRefreshToken('');
  };

  const handleEmail = () => {
    const email = SUPPORT_EMAIL;
    const subject = 'Contact Us';
    const body = 'Hello, I need help with...';
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(() => {});
  };

  const onPressAboutUs = () => {
    navigate(AppUserRoutes.AboutUs);
  };

  const handleConfirmDelete = () => {
    setModalVisible(false);
    handleDeleteAccount({
      successCallback: () => {
        handleLogout();
      },
    });
  };

  return (
    <Box flex={1}>
      <SafeAreaView style={styles.container}>
        <Header name="Help and Support" backButton />
        <Box pt={16} pl={16} pr={16}>
          <TouchableOpacity
            onPress={handleEmail}
            style={styles.buttonContainer}
          >
            <Box direction="row" alignItems="center">
              <AppIcon name="mail" />
              <Text style={styles.buttonText}>Contact Us</Text>
              <Box flex={1} alignItems="flex-end">
                <AppIcon name="arrow_right_small" />
              </Box>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressAboutUs}
            style={styles.buttonContainer}
          >
            <Box direction="row" alignItems="center">
              <AppIcon name="alert" />
              <Text style={styles.buttonText}>About Us</Text>
              <Box flex={1} alignItems="flex-end">
                <AppIcon name="arrow_right_small" />
              </Box>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setModalVisible(true)}
          >
            <Box direction="row" alignItems="center">
              <AppIcon name="delete" color="orange" />
              <Text style={styles.mainText}>Delete Account</Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <AccountDeleteModal
          isShowDeleteModal={modalVisible}
          onCloseModal={() => setModalVisible(false)}
          handleConfirmDelete={handleConfirmDelete}
        />
      </SafeAreaView>
      {loading === LoadingType.FETCH && <FullScreenLoader />}
    </Box>
  );
};

export default HelpAndSupport;

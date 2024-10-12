import React from 'react';

import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { userActions, userDataSelector } from 'store/slices/user';
import { asyncStorageService } from 'services/async-storage-service';
import { useTypedDispatch } from 'store/index';
import { Header } from 'components/header';
import { Box } from 'ui-kit/box';
import { AppIcon } from 'assets/index';
import { navigate } from 'shared/navigation/root-navigator.config';
import { useSelector } from 'react-redux';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useStyles } from './settings.styles';

const Settings = () => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const user = useSelector(userDataSelector);

  const handleLogout = async () => {
    dispatch(userActions.userLogout());
    await asyncStorageService.setAccessToken('');
    await asyncStorageService.setRefreshToken('');
  };

  const onPressEditProfile = () => {
    navigate(AppUserRoutes.EditProfile);
  };

  const onPressHelp = () => {
    navigate(AppUserRoutes.HelpAndSupport);
  };

  const onPressChangePassword = () => {
    navigate(AppUserRoutes.ChangePassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header name="Settings" backButton />
      <Box pt={16} pl={16} pr={16}>
        <TouchableOpacity
          onPress={onPressEditProfile}
          style={styles.buttonContainer}
        >
          <Box direction="row" alignItems="center">
            <AppIcon name="pen_edit" />
            <Text style={styles.buttonText}>Edit Profile</Text>
            <Box flex={1} alignItems="flex-end">
              <AppIcon name="arrow_right_small" />
            </Box>
          </Box>
        </TouchableOpacity>
        {user?.auth_type === 'email' && (
          <TouchableOpacity
            onPress={onPressChangePassword}
            style={styles.buttonContainer}
          >
            <Box direction="row" alignItems="center">
              <AppIcon name="lock" />
              <Text style={styles.buttonText}>Change Password</Text>
              <Box flex={1} alignItems="flex-end">
                <AppIcon name="arrow_right_small" />
              </Box>
            </Box>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onPressHelp} style={styles.buttonContainer}>
          <Box direction="row" alignItems="center">
            <AppIcon name="help" />
            <Text style={styles.buttonText}>Help and Support</Text>
            <Box flex={1} alignItems="flex-end">
              <AppIcon name="arrow_right_small" />
            </Box>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
          <Box direction="row" alignItems="center">
            <AppIcon name="logOut" color="orange" />
            <Text style={styles.mainText}>Log Out</Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
};

export default Settings;

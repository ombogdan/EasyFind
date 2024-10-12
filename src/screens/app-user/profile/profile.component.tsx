import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Header } from 'components/header';
import { Box } from 'ui-kit/box';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'shared/store/slices/user';
import { useStyles } from './profile.styles';
import { ProfileHeader } from './components/profile-header';
import { ProfileTabs } from './components/profile-tabs';

const Profile = () => {
  const styles = useStyles();
  const user = useSelector(userDataSelector);

  const handleGoToSettings = () => navigate(AppUserRoutes.Settings);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon="dots"
        onPressLeftButton={handleGoToSettings}
        name={user?.username}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE INFO */}
        <ProfileHeader />
        {/* PROFILE TABS */}
        <ProfileTabs />
        <Box pt={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Header } from 'components/header';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'shared/store/slices/user';
import { useStyles } from './profile.styles';

const Profile = () => {
  const styles = useStyles();
  const user = useSelector(userDataSelector);

  const handleGoToSettings = () => navigate(AppUserRoutes.Settings);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon="dots"
        onPressLeftButton={handleGoToSettings}
      />
      <ScrollView showsVerticalScrollIndicator={false}>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

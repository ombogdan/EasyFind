import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Header } from 'components/header';
import { useSelector } from 'react-redux';
import { userDataSelector } from 'shared/store/slices/user';
import { useStyles } from './profile.styles';

const Profile = () => {
  const styles = useStyles();
  const user = useSelector(userDataSelector);

  const handleGoToSettings = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon="dots"
        onPressLeftButton={handleGoToSettings}
      />
      <ScrollView showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
};

export default Profile;

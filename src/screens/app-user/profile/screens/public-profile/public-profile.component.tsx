import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Header } from 'components/header';
import { Box } from 'ui-kit/box';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { useStyles } from './public-profile.styles';
import { ProfileHeader } from '../../components/profile-header';
import { ProfileTabs } from '../../components/profile-tabs';

const PublicProfile = () => {
  const styles = useStyles();
  const { params } = useAppRoute<AppUserRoutes.PublicProfile>();

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton name={params?.username} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE HEADER */}
        <ProfileHeader username={params?.username} public_user_id={params.user_id} />
        {/* PROFILE TABS */}
        <ProfileTabs public_user_id={params.user_id} />
        <Box pt={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublicProfile;

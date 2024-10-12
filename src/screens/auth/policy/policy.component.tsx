import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { AuthHeader } from 'shared/components/auth-header';
import { getPolicy } from 'shared/core/services/api/auth/auth';
import { showToast } from 'shared/utils/show-toast';
import { SIZE } from 'shared/constants';
import { AppIcon } from 'shared/assets';
import { Box } from 'shared/ui-kit/box';
import AuthContainerComponent from '../../../shared/containers/auth-container/auth-container.component';
import { useStyles } from './policy.styles';

const Policy = () => {
  const styles = useStyles();
  const [policy, setPolicy] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await getPolicy();
      setPolicy(data.text);
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Failed to get policy',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthHeader rightText="Privacy Policy" />
      <AuthContainerComponent withoutLogo>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          paddingBottom: SIZE.xl,
        }}>
          <AppIcon name="logo" enable_color={false} color='danger' size={70}/>
          <View style={styles.loginDetailsContainer}>
            <Text style={styles.loginDetails}>Privacy Policy</Text>
          </View>
          <Box mt={SIZE.md}>
            <Text style={styles.text}>
          {policy}
          </Text>
          </Box>
        </ScrollView>
      </AuthContainerComponent>
    </SafeAreaView>
  );
};

export default Policy;

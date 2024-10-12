import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { AuthHeader } from 'shared/components/auth-header';
import { getTerms } from 'shared/core/services/api/auth/auth';
import { showToast } from 'shared/utils/show-toast';
import { SIZE } from 'shared/constants';
import { AppIcon } from 'shared/assets';
import { Box } from 'shared/ui-kit/box';
import AuthContainerComponent from '../../../shared/containers/auth-container/auth-container.component';
import { useStyles } from './terms.styles';

const Terms = () => {
  const styles = useStyles();
  const [terms, setTerms] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await getTerms();
      setTerms(data.text);
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Failed to get terms',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthHeader rightText="Terms" />
      <AuthContainerComponent withoutLogo>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          paddingBottom: SIZE.xl,
        }}>
          <AppIcon name="logo" enable_color={false} color='danger' size={70}/>
          <View style={styles.loginDetailsContainer}>
            <Text style={styles.loginDetails}>Terms</Text>
          </View>
          <Box mt={SIZE.md}>
            <Text style={styles.text}>
          {terms}
          </Text>
          </Box>
        </ScrollView>
      </AuthContainerComponent>
    </SafeAreaView>
  );
};

export default Terms;

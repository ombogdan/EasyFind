import { SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import { useFetchPopular, useFetchReleases } from 'shared/hooks/api';
import { useTypedDispatch } from 'shared/store';
import { homeActions, homeLoadingSelector } from 'shared/store/slices/home';
import { LoadingType } from 'shared/types';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useStyles } from './layout-container.styles';
import { LoadingIndicator } from '../loading-indicator';

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles();
  const { fetchReleases } = useFetchReleases();
  const { fetchPopular } = useFetchPopular();
  const dispatch = useTypedDispatch();
  const is_loading = useSelector(homeLoadingSelector);

  const getInitialData = async () => {
    try {
      const [releasesResponse, popularResponse] = await Promise.all([
        fetchReleases({}),
        fetchPopular({}),
      ]);

      if (releasesResponse) {
        dispatch(homeActions.setReleases(releasesResponse.data));
      }
      if (popularResponse) {
        dispatch(homeActions.setPopular(popularResponse.data));
      }
    } finally {
      dispatch(homeActions.setLoading(LoadingType.COMPLETE));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getInitialData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrap}>
        {is_loading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {children}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

export default LayoutContainer;

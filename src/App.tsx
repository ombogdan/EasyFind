import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from 'shared/theme';
import { persistor, store } from 'shared/store';
import { RootNavigator } from 'shared/navigation';
import { firebase } from '@react-native-firebase/analytics';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';
import Toast from 'react-native-toast-message';
import createToastConfig from 'shared/core/toast-config';
import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  const enableTrackingFeatures = async () => {
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
  };

  const checkAnalyticPermissions = async () => {
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      await enableTrackingFeatures();
    }
    if (trackingStatus === 'not-determined') {
      const trackingStatusNew = await requestTrackingPermission();
      if (
        trackingStatusNew === 'authorized' ||
        trackingStatusNew === 'unavailable'
      ) {
        await enableTrackingFeatures();
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkAnalyticPermissions();
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <RootNavigator />
          <Toast config={createToastConfig()} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;

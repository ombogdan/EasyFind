import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Home } from 'screens/app-user/home';
import { CustomTabBar } from 'components/custom-tab-bar';
import { AppUserRoutesParamList } from './app-user.navigator.types';
import { AppUserRoutes } from './app-user.navigator.enums';

const Stack = createStackNavigator<AppUserRoutesParamList>();
const Tab = createBottomTabNavigator();

const CustomTabBarComponent = (props: BottomTabBarProps) => (
  <CustomTabBar {...props} />
);

const MainTabNavigator = () => (
  <Tab.Navigator
    tabBar={CustomTabBarComponent}
    screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
  >
    <Tab.Screen name={AppUserRoutes.Home} component={Home} />
    <Tab.Screen name={AppUserRoutes.Bookings} component={Home} />
    <Tab.Screen name={AppUserRoutes.Profile} component={Home} />
  </Tab.Navigator>
);

export const AppUserNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={AppUserRoutes.HomeTabNavigation}
        component={MainTabNavigator}
      />
    </Stack.Navigator>
  );

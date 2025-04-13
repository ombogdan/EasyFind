import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Home } from 'screens/app-user/home';
import { CustomTabBar } from 'components/custom-tab-bar';
import { Profile } from "screens/app-user/profile";
import { Booking } from "screens/app-user/booking";
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
    <Tab.Screen name={AppUserRoutes.Bookings} component={Booking} />
    <Tab.Screen name={AppUserRoutes.Profile} component={Profile} />
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

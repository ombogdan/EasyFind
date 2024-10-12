import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Home } from 'screens/app-user/home';
import { selectUserMe } from 'store/selectors/user';
import { useTypedSelector } from 'store/index';
import { EnterYourNickname } from 'screens/app-user/enter-your-nickname';
import { Search } from 'screens/app-user/search';
import { Activity } from 'screens/app-user/activity';
import { Profile } from 'screens/app-user/profile';
import { CustomTabBar } from 'components/custom-tab-bar';
import { SearchFilters } from 'screens/app-user/search-filters';
import { AllAlbumsScreen } from 'screens/app-user/all-albums';
import { TrackDetail } from 'screens/app-user/track-detail';
import { GenreDetailScreen } from 'screens/app-user/genre-detail';
import { RateTrack } from 'screens/app-user/rate-track';
import { ArtistDetail } from 'screens/app-user/artist-detail';
import { Settings } from 'screens/app-user/profile/screens/settings';
import SearchMusic from 'screens/app-user/profile/screens/search-music';
import { ListForm } from 'screens/app-user/list-form';
import { SearchViewAllMusic } from 'screens/app-user/profile/screens/search-view-all-music';
import { CustomListMusic } from 'screens/app-user/profile/screens/custom-list-music';
import { PinnedList } from 'screens/app-user/profile/screens/pinned-list';
import { EditProfile } from 'screens/app-user/profile/screens/edit-profile';
import { CustomListDetails } from 'screens/app-user/profile/screens/custom-list-details';
import { PublicProfile } from 'screens/app-user/profile/screens/public-profile';
import { Followers } from 'screens/app-user/profile/screens/followers';
import { Report } from 'screens/app-user/report';
import { HelpAndSupport } from 'screens/app-user/profile/screens/help-and-support';
import { ChangePassword } from 'screens/app-user/profile/screens/change-password';
import { AboutUs } from 'screens/app-user/about-us';
import { TrackReviewList } from 'screens/app-user/track-review-list';
import { AppUserRoutesParamList } from './app-user.navigator.types';
import { AppUserRoutes } from './app-user.navigator.enums';
import ViewReview from '../../../screens/app-user/view-review/view-review.component';

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
    <Tab.Screen name={AppUserRoutes.Search} component={Search} />
    <Tab.Screen name={AppUserRoutes.Activity} component={Activity} />
    <Tab.Screen name={AppUserRoutes.Profile} component={Profile} />
  </Tab.Navigator>
);

export const AppUserNavigator = () => {
  const user = useTypedSelector(selectUserMe);

  return (
    <Stack.Navigator
      initialRouteName={
        user?.username
          ? AppUserRoutes.HomeTabNavigation
          : AppUserRoutes.EnterYourNickname
      }
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={AppUserRoutes.HomeTabNavigation}
        component={MainTabNavigator}
      />
      <Stack.Screen
        name={AppUserRoutes.EnterYourNickname}
        component={EnterYourNickname}
      />
      <Stack.Screen
        name={AppUserRoutes.SearchFilters}
        component={SearchFilters}
      />
      <Stack.Screen
        name={AppUserRoutes.AllAlbums}
        component={AllAlbumsScreen}
      />
      <Stack.Screen name={AppUserRoutes.TrackDetail} component={TrackDetail} />
      <Stack.Screen
        name={AppUserRoutes.GenreDetailScreen}
        component={GenreDetailScreen}
      />
      <Stack.Screen name={AppUserRoutes.RateTrack} component={RateTrack} />
      <Stack.Screen
        name={AppUserRoutes.ArtistDetail}
        component={ArtistDetail}
      />
      <Stack.Screen name={AppUserRoutes.ViewReview} component={ViewReview} />
      <Stack.Screen name={AppUserRoutes.Settings} component={Settings} />
      <Stack.Screen name={AppUserRoutes.ListForm} component={ListForm} />
      <Stack.Screen name={AppUserRoutes.SearchMusic} component={SearchMusic} />
      <Stack.Screen
        name={AppUserRoutes.SearchViewAllMusic}
        component={SearchViewAllMusic}
      />
      <Stack.Screen
        name={AppUserRoutes.CustomListMusic}
        component={CustomListMusic}
      />
      <Stack.Screen name={AppUserRoutes.PinnedList} component={PinnedList} />
      <Stack.Screen name={AppUserRoutes.EditProfile} component={EditProfile} />
      <Stack.Screen
        name={AppUserRoutes.CustomListDetails}
        component={CustomListDetails}
      />
      <Stack.Screen
        name={AppUserRoutes.PublicProfile}
        component={PublicProfile}
      />
      <Stack.Screen name={AppUserRoutes.Followers} component={Followers} />
      <Stack.Screen name={AppUserRoutes.Report} component={Report} />
      <Stack.Screen
        name={AppUserRoutes.HelpAndSupport}
        component={HelpAndSupport}
      />
      <Stack.Screen
        name={AppUserRoutes.ChangePassword}
        component={ChangePassword}
      />
      <Stack.Screen name={AppUserRoutes.AboutUs} component={AboutUs} />
      <Stack.Screen name={AppUserRoutes.TrackReviewList} component={TrackReviewList} />
    </Stack.Navigator>
  );
};

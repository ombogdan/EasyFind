import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { AppUserRoutes } from './app-user.navigator.enums';

export type AppUserRoutesParamList = {
  [AppUserRoutes.Home]: {} | undefined;
  [AppUserRoutes.Search]: {} | undefined;
  [AppUserRoutes.Likes]: {} | undefined;
  [AppUserRoutes.Profile]: {} | undefined;
  [AppUserRoutes.HomeTabNavigation]: {} | undefined;
};

export type AppUserRoutesNavigationProps =
  StackNavigationProp<AppUserRoutesParamList>;

export type AppUserRouteProps<RouteName extends keyof AppUserRoutesParamList> =
  RouteProp<AppUserRoutesParamList, RouteName>;

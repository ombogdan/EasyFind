import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { AuthRoutes } from './auth.navigator.enums';

export type AuthRoutesParamList = {
  [AuthRoutes.LogIn]: {} | undefined;
};

export type AuthRoutesNavigationProps =
  StackNavigationProp<AuthRoutesParamList>;

export type AuthRouteProps<RouteName extends keyof AuthRoutesParamList> =
  RouteProp<AuthRoutesParamList, RouteName>;

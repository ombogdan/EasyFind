import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { AuthRoutes } from './auth.navigator.enums';

export type AuthRoutesParamList = {
  [AuthRoutes.LogIn]: {} | undefined;
  [AuthRoutes.SignUp]: {} | undefined;
  [AuthRoutes.SignUpWithEmail]: {} | undefined;
  [AuthRoutes.EnterVerificationCode]: { email: string; fullName: string; password: string; };
  [AuthRoutes.ForgotPassword]: {} | undefined;
  [AuthRoutes.Terms]: {} | undefined;
  [AuthRoutes.Policy]: {} | undefined;
};

export type AuthRoutesNavigationProps =
  StackNavigationProp<AuthRoutesParamList>;

export type AuthRouteProps<RouteName extends keyof AuthRoutesParamList> =
  RouteProp<AuthRoutesParamList, RouteName>;

import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import { SignUp } from "screens/auth/sign-up";
import { LogIn } from "screens/auth/log-in";
import { SignUpWithEmail } from "screens/auth/sign-up-with-email";
import EnterVerificationCode from "screens/auth/enter-verification-code/enter-verification-code.component";
import { ForgotPassword } from "screens/auth/forgot-password";
import { Terms } from "screens/auth/terms";
import { Policy } from "screens/auth/policy";
import { AuthRoutes } from "./auth.navigator.enums";
import { AuthRoutesParamList } from "./auth.navigator.types";

const Stack = createStackNavigator<AuthRoutesParamList>();

export const AuthNavigator = () => (
    <Stack.Navigator
      initialRouteName={AuthRoutes.LogIn}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
      }}
    >
      <Stack.Screen
        component={LogIn}
        name={AuthRoutes.LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SignUp}
        name={AuthRoutes.SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SignUpWithEmail}
        name={AuthRoutes.SignUpWithEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={EnterVerificationCode}
        name={AuthRoutes.EnterVerificationCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ForgotPassword}
        name={AuthRoutes.ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Terms}
        name={AuthRoutes.Terms}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Policy}
        name={AuthRoutes.Policy}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

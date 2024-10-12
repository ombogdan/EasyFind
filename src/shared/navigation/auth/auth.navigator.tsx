import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import { LogIn } from "screens/auth/log-in";
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
    </Stack.Navigator>
  );

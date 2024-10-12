import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useTypedSelector } from "shared/store";

import BootSplash from "react-native-bootsplash";
import { selectIsUserAuthedStatus } from "store/selectors/user";
import { navigationRef } from "./root-navigator.config";
import { AuthNavigator } from "./auth/auth.navigator";
import { AppUserNavigator } from "./app-user/app-user.navigator";

export const RootNavigator = () => {
  const isUserAuthed = useTypedSelector(selectIsUserAuthedStatus);

  return (
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })} ref={navigationRef}>
      {!isUserAuthed ? (
        <AuthNavigator />
      ) : (
        <AppUserNavigator />
      )}
    </NavigationContainer>
  );
};

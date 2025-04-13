import React, { useEffect, useState } from "react";

import { Image, ImageBackground, Platform, SafeAreaView, Text } from "react-native";
import { Box } from "ui-kit/box";
import { LOGIN_BACKGROUND, LOGO_ICON } from "constants/index";
import { useTypedDispatch } from "store/index";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import useSignUpApple from "shared/hooks/api/auth/useSignUpApple";
import { useTranslation } from "react-i18next";
import { api } from "services/api";
import { asyncStorageService } from "services/async-storage-service";
import { userActions } from "store/slices/user";
import { useStyles } from "./log-in.styles";
import SignButton from "./components/sign-button/sign-button.component";

const LogIn = () => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const { handleSignUpApple, loading } = useSignUpApple();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "205264277767-pero3rub5m4ok98iv086dvhecdunjlg1.apps.googleusercontent.com",
      iosClientId: "205264277767-8mc9cq9krov8g0es0j3c734uosa2rlvv.apps.googleusercontent.com"
    });
  }, []);


  const handlePressGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { data } = await api.auth.loginByGoogle(userInfo?.idToken ?? "")
      await asyncStorageService.setAccessToken(data.access);
      await asyncStorageService.setRefreshToken(data.refresh);
      dispatch(userActions.userLogin(data.user));
      setIsLoading(false);
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={LOGIN_BACKGROUND}
      resizeMode="cover"
      style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <Box alignItems="center" pt={64}>
          <Image source={LOGO_ICON} style={styles.logo} />
        </Box>
        <Box mb={50} pl={16} pr={16}>
          {Platform.OS === "ios" && (
            <SignButton
              apple
              isLoading={loading}
              onPress={handleSignUpApple}
              title={t("continueWithApple")}
            />
          )}
          {Platform.OS === "ios" && (
            <Box pt={13} pb={20} fullWidth alignItems="center">
              <Text style={styles.orText}>{t("or")}</Text>
            </Box>
          )}
          <SignButton
            apple={false}
            isLoading={isLoading}
            onPress={handlePressGoogleLogin}
            title={t("continueWithGoogle")}
          />
        </Box>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default LogIn;

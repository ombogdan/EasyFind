import React, { useEffect } from "react";

import { Image, ImageBackground, SafeAreaView } from "react-native";
import { Box } from "ui-kit/box";
import { CustomButton } from "ui-kit/custom-button";
import { BUTTON_VARIANTS, LOGIN_BACKGROUND, LOGO_ICON } from "constants/index";
import { asyncStorageService } from "services/async-storage-service";
import { userActions } from "store/slices/user";
import { useTypedDispatch } from "store/index";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import useSignUpApple from "shared/hooks/api/auth/useSignUpApple";
import { useTranslation } from "react-i18next";
import { useStyles } from "./log-in.styles";


const LogIn = () => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const { handleSignUpApple, loading: isLoadingApple } = useSignUpApple();
  const { t } = useTranslation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "205264277767-pero3rub5m4ok98iv086dvhecdunjlg1.apps.googleusercontent.com",
      iosClientId: "205264277767-8mc9cq9krov8g0es0j3c734uosa2rlvv.apps.googleusercontent.com"
    });
  }, []);


  const handlePressGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      console.log("userInfo");
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      // const dataGoogleProfile = await auth().signInWithCredential(
      //   googleCredential
      // );
      console.log(googleCredential);
      console.log("googleCredential");
      // const loginData = await loginByGoogle({
      //   id_token: userInfo?.idToken ?? "",
      //   email: dataGoogleProfile?.additionalUserInfo?.profile?.email ?? "",
      //   full_name: `${
      //     dataGoogleProfile?.additionalUserInfo?.profile?.given_name ?? ""
      //   } ${dataGoogleProfile?.additionalUserInfo?.profile?.family_name ?? ""}`
      // });
      await asyncStorageService.setAccessToken("loginData.data.access");
      await asyncStorageService.setRefreshToken("loginData.data.refresh");
      // const userData = await getMe();
      dispatch(userActions.userLogin({ name: "Bogdan" }));
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
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
          <CustomButton
            variant={BUTTON_VARIANTS.primary}
            onPress={handlePressGoogleLogin}
            title={t("continueWithGoogle")}
          />
          <CustomButton
            isLoading={isLoadingApple === "FETCH"}
            variant={BUTTON_VARIANTS.primary}
            onPress={handleSignUpApple}
            title={t("continueWithApple")}
          />
        </Box>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default LogIn;

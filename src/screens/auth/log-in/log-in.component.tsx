import React, { useEffect } from "react";

import { Image, SafeAreaView, View } from "react-native";
import { Box } from "ui-kit/box";
import { CustomButton } from "ui-kit/custom-button";
import { BUTTON_VARIANTS, LOGO_ICON } from "constants/index";
import { getMe, loginByGoogle } from "services/api/auth/auth";
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
      console.log(userInfo)
      console.log('userInfo')
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      // const dataGoogleProfile = await auth().signInWithCredential(
      //   googleCredential
      // );
      console.log(googleCredential)
      console.log('googleCredential')
      // const loginData = await loginByGoogle({
      //   id_token: userInfo?.idToken ?? "",
      //   email: dataGoogleProfile?.additionalUserInfo?.profile?.email ?? "",
      //   full_name: `${
      //     dataGoogleProfile?.additionalUserInfo?.profile?.given_name ?? ""
      //   } ${dataGoogleProfile?.additionalUserInfo?.profile?.family_name ?? ""}`
      // });
      await asyncStorageService.setAccessToken('loginData.data.access');
      await asyncStorageService.setRefreshToken('loginData.data.refresh');
      // const userData = await getMe();
      dispatch(userActions.userLogin({name: 'Bogdan'}));
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box alignItems="center" pt={100}>
        <Image source={LOGO_ICON} style={styles.logo} />
      </Box>
      <Box pt={40} pl={10} pr={10} fullWidth direction="row" alignItems="center">
        <View style={styles.line} />
      </Box>
      <Box pt={200} pl={10} pr={10}>
        <CustomButton
          variant={BUTTON_VARIANTS.primary}
          onPress={handlePressGoogleLogin}
          title={t("continueWithGoogle")}
          rightIcon="google"
        />
      </Box>
      <Box pt={16} pl={10} pr={10}>
        <CustomButton
          isLoading={isLoadingApple === "FETCH"}
          variant={BUTTON_VARIANTS.primary}
          onPress={handleSignUpApple}
          title={t("continueWithApple")}
          rightIcon="apple"
        />
      </Box>
    </SafeAreaView>
  );
};

export default LogIn;

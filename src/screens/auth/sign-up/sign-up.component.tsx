import React from 'react';

import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Box } from 'ui-kit/box';
import { CustomButton } from 'ui-kit/custom-button';
import { BUTTON_VARIANTS, SIZE } from 'constants/index';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AuthRoutes } from 'shared/navigation/auth';
import { AuthHeader } from 'components/auth-header';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { getMe, loginByGoogle } from 'services/api/auth/auth';
import { asyncStorageService } from 'services/async-storage-service';
import { userActions } from 'store/slices/user';
import { useTypedDispatch } from 'store/index';
import { useSignUpApple } from 'shared/hooks/api';
import { LoadingType } from 'shared/types';
import AuthContainerComponent from '../../../shared/containers/auth-container/auth-container.component';
import { useStyles } from './sign-up.styles';

const SignUp = () => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const { handleSignUpApple, loading } = useSignUpApple();

  const handlePressGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const dataGoogleProfile = await auth().signInWithCredential(googleCredential);
      const loginData = await loginByGoogle({
        id_token: userInfo?.idToken ?? "",
        email: dataGoogleProfile?.additionalUserInfo?.profile?.email ?? "",
        full_name: `${dataGoogleProfile?.additionalUserInfo?.profile?.given_name ?? ""} ${dataGoogleProfile?.additionalUserInfo?.profile?.family_name ?? ""}`
      });
      await asyncStorageService.setAccessToken(loginData.data.access);
      await asyncStorageService.setRefreshToken(loginData.data.refresh);
      const userData = await getMe();
      dispatch(userActions.userLogin(userData.data));
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  const handlePressAppleLogin = () => {
    handleSignUpApple();
  };

  const handlePressSignUpWithEmail = () => {
    navigate(AuthRoutes.SignUpWithEmail);
  };

  const onPressTerms = () => {
    navigate(AuthRoutes.Terms)
  }

  const onPressPolicy = () => {
    navigate(AuthRoutes.Policy)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthHeader rightText="Create account" />
      <AuthContainerComponent>
        <View style={styles.mainContainer}>
          <View>
            <Box mt={24}>
              <Text style={styles.signUp}>Sign up</Text>
            </Box>
            <Box pt={32}>
              <CustomButton
                variant={BUTTON_VARIANTS.secondary}
                onPress={handlePressSignUpWithEmail}
                title="Sign up with Email"
                rightIcon="mail"
              />
            </Box>
            <Box pt={16}>
              <CustomButton
                variant={BUTTON_VARIANTS.secondary}
                onPress={handlePressGoogleLogin}
                title="Sign up with Google"
                rightIcon="google"
              />
            </Box>
            <Box pt={16}>
              <CustomButton
                isLoading={loading === LoadingType.FETCH}
                variant={BUTTON_VARIANTS.secondary}
                onPress={handlePressAppleLogin}
                title="Sign up with Apple"
                rightIcon="apple"
              />
            </Box>
          </View>
          <Box mb={SIZE.md}>
            <Text style={styles.descBlack}>Continue if you agree to our </Text>
            <Box justifyContent="center" direction="row">
              <TouchableOpacity onPress={onPressTerms} activeOpacity={0.5}>
                <Text style={styles.descOrange}>Terms</Text>
              </TouchableOpacity>
              <Text style={styles.descBlack}> and </Text>
              <TouchableOpacity onPress={onPressPolicy} activeOpacity={0.5}>
                <Text style={styles.descOrange}>Privacy Policy.</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </View>
      </AuthContainerComponent>
    </SafeAreaView>
  );
};

export default SignUp;

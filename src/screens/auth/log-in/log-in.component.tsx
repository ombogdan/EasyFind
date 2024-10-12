import React, { useEffect, useState } from 'react';

import { Pressable, Text, View } from 'react-native';
import CustomInput from 'ui-kit/custom-input/custom-input.component';
import { Box } from 'ui-kit/box';
import { CustomButton } from 'ui-kit/custom-button';
import { BUTTON_VARIANTS, emailRegexp } from 'constants/index';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AuthRoutes } from 'shared/navigation/auth';
import { getMe, logIn, loginByGoogle } from 'services/api/auth/auth';
import { asyncStorageService } from 'services/async-storage-service';
import { userActions } from 'store/slices/user';
import { useTypedDispatch } from 'store/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useSignUpApple } from 'shared/hooks/api';
import { LoadingType } from 'shared/types';
import AuthContainerComponent from '../../../shared/containers/auth-container/auth-container.component';
import { useStyles } from './log-in.styles';

const LogIn = () => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const { handleSignUpApple, loading: isLoadingApple } = useSignUpApple();

  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '169933514333-lln1a2spv3722if17orp8garaa3nuko6.apps.googleusercontent.com',
      iosClientId:
        '169933514333-0por33p5hj1n8m3gnguemj9h7fd7bofk.apps.googleusercontent.com',
    });
  }, []);

  const handleLogin = async () => {
    if (!password || !email) {
      if (!password) {
        setPasswordErrorMessage('Please enter your password');
      }
      if (!email) {
        setEmailErrorMessage('Please enter your email');
      }
      return;
    }
    if (!emailRegexp.test(email)) {
      setEmailErrorMessage('Please enter valid email');
      return;
    }
    setIsLoading(true);
    try {
      const loginData = await logIn({ email, password });
      await asyncStorageService.setAccessToken(loginData.data.access);
      await asyncStorageService.setRefreshToken(loginData.data.refresh);
      const userData = await getMe();
      dispatch(userActions.userLogin(userData.data));
      setIsLoading(false);
    } catch (error) {
      setPasswordErrorMessage('Unable to Log in with the provided credentials');
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate(AuthRoutes.SignUp);
  };

  const handlePressGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const dataGoogleProfile = await auth().signInWithCredential(
        googleCredential,
      );
      const loginData = await loginByGoogle({
        id_token: userInfo?.idToken ?? '',
        email: dataGoogleProfile?.additionalUserInfo?.profile?.email ?? '',
        full_name: `${
          dataGoogleProfile?.additionalUserInfo?.profile?.given_name ?? ''
        } ${dataGoogleProfile?.additionalUserInfo?.profile?.family_name ?? ''}`,
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

  const handlePressAppleLogin = async () => {
    handleSignUpApple();
  };

  return (
    <AuthContainerComponent>
      <View style={styles.loginDetailsContainer}>
        <Text style={styles.loginDetails}>Login</Text>
      </View>
      <Box pt={32}>
        <CustomInput
          value={email}
          onChangeValue={(value) => {
            setEmail(value);
            setEmailErrorMessage('');
          }}
          keyboardType="email-address"
          placeholder="Enter email"
          errorMessage={emailErrorMessage}
          name="Email"
        />
      </Box>
      <Box pt={16}>
        <CustomInput
          value={password}
          onChangeValue={(value) => {
            setPassword(value);
            setPasswordErrorMessage('');
          }}
          secureTextEntry
          placeholder="Enter password"
          errorMessage={passwordErrorMessage}
          name="Password"
        />
      </Box>
      <Box pt={passwordErrorMessage ? 24 : 14}>
        <Pressable
          onPress={() => {
            navigate(AuthRoutes.ForgotPassword);
          }}
        >
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </Pressable>
      </Box>
      <Box pt={24}>
        <CustomButton
          variant={BUTTON_VARIANTS.primary}
          onPress={handleLogin}
          title="Log in"
          rightIcon="arrow-right"
          isLoading={isLoading}
        />
      </Box>
      <Box pt={16}>
        <CustomButton
          variant={BUTTON_VARIANTS.secondary}
          onPress={handleSignUp}
          title="Sign up"
          rightIcon="arrow-right"
        />
      </Box>
      <Box pt={40} fullWidth direction="row" alignItems="center">
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </Box>
      <Box pt={40}>
        <CustomButton
          variant={BUTTON_VARIANTS.secondary}
          onPress={handlePressGoogleLogin}
          title="Continue with Google"
          rightIcon="google"
        />
      </Box>
      <Box pt={16}>
        <CustomButton
          isLoading={isLoadingApple === LoadingType.FETCH}
          variant={BUTTON_VARIANTS.secondary}
          onPress={handlePressAppleLogin}
          title="Continue with Apple"
          rightIcon="apple"
        />
      </Box>
    </AuthContainerComponent>
  );
};

export default LogIn;

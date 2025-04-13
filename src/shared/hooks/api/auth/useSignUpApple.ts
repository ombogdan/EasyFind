import appleAuth from '@invertase/react-native-apple-authentication';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginByApple } from 'shared/core/services/api/auth/auth';
import { asyncStorageService } from 'shared/core/services/async-storage-service';
import { userActions } from 'shared/store/slices/user';
import { api } from "services/api";

const useSignUpApple = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUpUser = async (authorizationCode: string) => {
    try {
      const respones = await loginByApple(authorizationCode);

      await asyncStorageService.setAccessToken(respones.data.access);
      await asyncStorageService.setRefreshToken(respones.data.refresh);
      const userData = await api.user.getMe();
      dispatch(userActions.userLogin(userData.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpApple = async () => {
    setLoading(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      if (!appleAuthRequestResponse.authorizationCode) {
        throw new Error(
          'Apple Sign-In failed - no authorization token returned',
        );
      }

      await handleSignUpUser(appleAuthRequestResponse.authorizationCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSignUpApple };
};

export default useSignUpApple;

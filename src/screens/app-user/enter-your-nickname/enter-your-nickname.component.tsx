import React, { useEffect } from "react";

import { SafeAreaView, Text } from "react-native";
import { AuthContainerComponent } from "shared/containers/auth-container";
import { Box } from "ui-kit/box";
import { CustomButton } from "ui-kit/custom-button";
import { BUTTON_VARIANTS } from "constants/index";
import CustomInput from "ui-kit/custom-input/custom-input.component";
import { checkUser, getMe, setUsername } from "services/api/auth/auth";
import { userActions } from "store/slices/user";
import { useTypedDispatch, useTypedSelector } from "store/index";
import { navigate } from "shared/navigation/root-navigator.config";
import { AppUserRoutes } from "shared/navigation/app-user";
import { selectUserMe } from "store/selectors/user";
import { useStyles } from "./enter-your-nickname.styles";

const EnterYourNickname = () => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector(selectUserMe);

  const [userName, setUserName] = React.useState("");
  const [errorUsernameMessage, setErrorUsernameMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCheckUsername = async (newUserName: string) => {
    const data = await checkUser({ username: newUserName });
    if (data.data.exist === true) {
      setErrorUsernameMessage("This username is already taken. Please enter a new one");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      const baseName = user.email.split("@")[0];
      const randomNumber = Math.floor(Math.random() * 100);
      setUserName(`${baseName}${randomNumber}`);
      handleCheckUsername(`${baseName}${randomNumber}`);
    }
  }, [user]);

  const handlePressCheckUsernameAndContinue = async () => {
    try {
      setIsLoading(true);
      const data = await checkUser({ username: userName });
      if (data.data.exist === false) {
        const usernameData = await setUsername({ username: userName });
        if (usernameData.data.username) {
          const userData = await getMe();
          dispatch(userActions.userLogin(userData.data));
          navigate(AppUserRoutes.HomeTabNavigation);
        }
        setIsLoading(false);
      } else {
        setErrorUsernameMessage("This username is already taken. Please enter a new one");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContainerComponent>
        <Box mt={24}>
          <Text style={styles.signUp}>Choose your username</Text>
        </Box>
        <Box pt={32}>
          <CustomInput
            value={userName}
            onChangeValue={(newUserName) => {
              setUserName(newUserName.toLowerCase());
              setErrorUsernameMessage("");
            }}
            maxLength={256}
            placeholder="@username"
            errorMessage={errorUsernameMessage}
            name="Username"
          />
        </Box>

        <Box pt={32}>
          <CustomButton
            variant={BUTTON_VARIANTS.primary}
            onPress={handlePressCheckUsernameAndContinue}
            title="Coninue"
            rightIcon="arrow-right"
            isLoading={isLoading}
            disabled={userName.length < 2}
          />
        </Box>
      </AuthContainerComponent>
    </SafeAreaView>
  );
};

export default EnterYourNickname;

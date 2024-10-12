import React, { useState } from "react";

import { SafeAreaView, Text } from "react-native";
import { AuthContainerComponent } from "shared/containers/auth-container";
import { navigate } from "shared/navigation/root-navigator.config";
import { AuthRoutes } from "shared/navigation/auth";
import { Box } from "ui-kit/box";
import CustomInput from "ui-kit/custom-input/custom-input.component";
import { CustomButton } from "ui-kit/custom-button";
import { BUTTON_VARIANTS, emailRegexp } from "constants/index";
import { AuthHeader } from "components/auth-header";
import { checkUser, sendCode } from "services/api/auth/auth";
import { useStyles } from "./sign-up-with-email.styles";

const SignUpWithEmail = () => {
  const styles = useStyles();
  const [fullName, setFullName] = useState("");
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePressContinue = async () => {
    setIsLoading(true);
    if (fullName === "" || email === "" || password === "") {
      if (!fullName) {
        setFullNameErrorMessage("Please enter your Full Name");
      }
      if (!email) {
        setEmailErrorMessage("Please enter your email");
      }
      if (!password) {
        setPasswordErrorMessage("Please enter your password");
      }
      setIsLoading(false);
      return;
    }
    if (fullName.length < 2) {
      setFullNameErrorMessage("Full Name should be at least 2 characters");
      setIsLoading(false);
      return;
    }
    if (!emailRegexp.test(email)) {
      setEmailErrorMessage("Please enter valid email");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }
    try {
      const user = await checkUser({ email });
      if (user.data.exist) {
        setEmailErrorMessage("User with this email address already exists");
      } else {
        await sendCode({ email });
        navigate(AuthRoutes.EnterVerificationCode, { email, fullName, password });
      }
      setIsLoading(false);
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthHeader rightText="Create account" />
      <AuthContainerComponent>
        <Box mt={24}>
          <Text style={styles.signUp}>Sign up</Text>
        </Box>
        <Box mt={32}>
          <CustomInput
            value={fullName}
            onChangeValue={(value) => {
              setFullName(value);
              setFullNameErrorMessage("");
            }}
            placeholder="Full Name"
            errorMessage={fullNameErrorMessage}
            name="Full name"
          />
        </Box>
        <Box mt={16}>
          <CustomInput
            value={email}
            onChangeValue={(value) => {
              setEmail(value);
              setEmailErrorMessage("");
            }}
            keyboardType="email-address"
            placeholder="Enter email"
            errorMessage={emailErrorMessage}
            name="Email"
          />
        </Box>
        <Box mt={16}>
          <CustomInput
            secureTextEntry
            value={password}
            onChangeValue={(value) => {
              setPassword(value);
              setPasswordErrorMessage("");
            }}
            placeholder="Create password"
            errorMessage={passwordErrorMessage}
            name="Password"
          />
        </Box>
        <Box pt={42}>
          <CustomButton
            variant={BUTTON_VARIANTS.primary}
            onPress={handlePressContinue}
            title="Coninue"
            rightIcon="arrow-right"
            isLoading={isLoading}
          />
        </Box>
      </AuthContainerComponent>
    </SafeAreaView>
  );
};

export default SignUpWithEmail;

import React, { useEffect, useState } from "react";

import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { AuthContainerComponent } from "shared/containers/auth-container";
import { Box } from "ui-kit/box";
import CustomInput from "ui-kit/custom-input/custom-input.component";
import { CustomButton } from "ui-kit/custom-button";
import { BUTTON_VARIANTS, emailRegexp } from "constants/index";
import { AuthHeader } from "components/auth-header";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { AppIcon } from "assets/index";
import { useStopwatch } from "hooks/timer/useStopwatch";
import { AuthRoutes } from "shared/navigation/auth";
import { reset } from "shared/navigation/root-navigator.config";
import { checkUser, checkVerificationCode, resetPassword, sendCode } from "services/api/auth/auth";
import Toast from "react-native-toast-message";
import { useStyles } from "./forgot-password.styles";

const ForgotPassword = () => {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [step, setStep] = useState("first");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorCodeMessage, setErrorCodeMessage] = useState("");
  const [passwordNewErrorMessage, setPasswordNewErrorMessage] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const { reset: resetTimer, totalSeconds } = useStopwatch({ autoStart: false });

  const handleContinue = async () => {
    if (!emailRegexp.test(email)) {
      setEmailErrorMessage("Please enter valid email");
      return;
    }
    setLoading(true);
    const data = await checkUser({ email });
    if (data.data.exist === false) {
      setEmailErrorMessage("The email you entered does not exist");
      setLoading(false);
    } else {
      try {
        await sendCode({ email });
        setStep("second");
        resetTimer();
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  const handlePressConfirmCode = async () => {
    try {
      await checkVerificationCode({ email, code: verificationCode });
      setStep("third");
    } catch (e) {
      setVerificationCode("");
      setErrorCodeMessage("Entered code is not valid");
    }
  };

  useEffect(() => {
    setErrorCodeMessage("");
  }, [verificationCode]);

  const handleResendCode = async () => {
    resetTimer();
    await sendCode({ email });
  };

  const handleChangePassword = async () => {
    if (!newPassword || !newPasswordConfirm) {
      if (!newPassword) {
        setNewPasswordError("Password must be at least 8 characters.");
      }
      if (!passwordNewErrorMessage) {
        setPasswordNewErrorMessage("Password must be at least 8 characters.");
      }
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setPasswordNewErrorMessage("Oops! Your passwords do not match");
      return;
    }
    setLoading(true);
    // @ts-ignore
    // @ts-ignore
    try {
      await resetPassword({
        email,
        password: newPassword,
        password_1: newPasswordConfirm,
        code_confirm: verificationCode
      });
      reset(AuthRoutes.LogIn);
      setLoading(false);
    } catch (error: any) {
      Toast.show({
        type: "success",
        text1: error?.response?.data?.non_field_errors?.[0] ?? ""
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthHeader rightText="Forgot password" />
      {step === "first" &&
        <AuthContainerComponent>
          <Box mt={24}>
            <Text style={styles.signUp}>Reset your password</Text>
          </Box>
          <Box pt={16}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text style={styles.descText}>Type in your email and we'll send you a code to reset your password</Text>
          </Box>
          <Box pt={32}>
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
          <Box pt={42}>
            <CustomButton
              variant={BUTTON_VARIANTS.primary}
              onPress={handleContinue}
              isLoading={loading}
              title="Continue"
              rightIcon="arrow-right"
            />
          </Box>
        </AuthContainerComponent>
      }
      {step === "second" &&
        <AuthContainerComponent>
          <Box mt={24}>
            <Text style={styles.signUp}>Reset your password</Text>
          </Box>
          <Box mt={16}>
            <Text style={styles.enderCode}>Enter the 6-digit that we have sent via the mail <Text
              style={styles.enderCodeBold}>{email}</Text></Text>
          </Box>
          <Box pt={32}>
            <CodeField
              value={verificationCode}
              onChangeText={setVerificationCode}
              cellCount={6}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  style={[errorCodeMessage ? styles.inputContainerRed : isFocused ? styles.inputContainerOrange : styles.inputContainer]}>
                  <Text
                    key={index}
                    style={styles.code}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {errorCodeMessage &&
              <Text style={styles.errorCodeMessage}>{errorCodeMessage}</Text>
            }
          </Box>
          <Box pt={32}>
            <CustomButton
              variant={BUTTON_VARIANTS.primary}
              onPress={handlePressConfirmCode}
              title="Coninue"
              isLoading={loading}
              rightIcon="arrow-right"
            />
          </Box>
          <Box pt={30} direction="row" alignItems="center" justifyContent="center">
            {totalSeconds > 60 ?
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.resendCode}>Resend code</Text>
              </TouchableOpacity>
              :
              <Text style={styles.resendCodeGray}>Resend code</Text>
            }
            <AppIcon name="timer" size={20} color="orange" />
            <Text style={styles.timer}>
              {totalSeconds < 60 ? `00:${(59 - totalSeconds).toString().padStart(2, "0")}` : "00:00"}
            </Text>
          </Box>
        </AuthContainerComponent>
      }
      {step === "third" &&
        <AuthContainerComponent>
          <Box mt={24}>
            <Text style={styles.signUp}>New password</Text>
          </Box>
          <Box pt={16}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text style={styles.descText}>We’ll ask for this password whenever you Log in</Text>
          </Box>
          <Box pt={32}>
            <CustomInput
              value={newPassword}
              onChangeValue={(value) => {
                setNewPassword(value);
                setNewPasswordError("");
              }}
              errorMessage={newPasswordError}
              secureTextEntry
              placeholder="Create password"
              name="Password"
            />
          </Box>
          <Box pt={16}>
            <CustomInput
              value={newPasswordConfirm}
              onChangeValue={(value) => {
                setNewPasswordConfirm(value);
                setPasswordNewErrorMessage("");
              }}
              errorMessage={passwordNewErrorMessage}
              secureTextEntry
              placeholder="Confirm password"
              name="Confirm Password"
            />
          </Box>
          <Box pt={42}>
            <CustomButton
              variant={BUTTON_VARIANTS.primary}
              onPress={handleChangePassword}
              isLoading={loading}
              title="Continue"
              rightIcon="arrow-right"
            />
          </Box>
        </AuthContainerComponent>
      }
    </SafeAreaView>
  );
};

export default ForgotPassword;

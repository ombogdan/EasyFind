import React, { useEffect } from "react";

import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { AuthContainerComponent } from "shared/containers/auth-container";
import { AppIcon } from "assets/index";
import { Box } from "ui-kit/box";
import { CustomButton } from "ui-kit/custom-button";
import { BUTTON_VARIANTS } from "constants/index";
import {
  CodeField, Cursor
} from "react-native-confirmation-code-field";
import { useStopwatch } from "hooks/timer/useStopwatch";
import { getMe, register, sendCode } from "services/api/auth/auth";
import { AuthHeader } from "components/auth-header";
import { asyncStorageService } from "services/async-storage-service";
import { userActions } from "store/slices/user";
import { useTypedDispatch } from "store/index";
import { useStyles } from "./enter-verification-code.styles";

type EnterVerificationCodeProps = {
  route: {
    params: {
      email: string;
      fullName: string;
      password: string;
    }
  }
}
const EnterVerificationCode = ({ route }: EnterVerificationCodeProps) => {
  const styles = useStyles();
  const dispatch = useTypedDispatch();
  const { email, fullName, password } = route?.params ?? {};
  const { reset, totalSeconds } = useStopwatch({ autoStart: true });
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("Entered code is not valid");
  const [isLoading, setIsLoading] = React.useState(false);
  const CELL_COUNT = 6;

  const handlePressContinue = async () => {
    if (value.length !== 6) {
      return;
    }
    setIsLoading(true);
    try {
      const registerData = await register({
        "email": email,
        "full_name": fullName,
        "password": password,
        "code_confirm": value
      });
      await asyncStorageService.setAccessToken(registerData.data.access);
      await asyncStorageService.setRefreshToken(registerData.data.refresh);
      const userData = await getMe();
      dispatch(userActions.userLogin(userData.data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setValue("");
      setErrorMessage("Entered code is not valid");
    }
  };

  const handleResendCode = async () => {
    reset();
    await sendCode({ email });
  };

  useEffect(() => {
    setErrorMessage("");
  }, [value]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthHeader rightText="Create account" />
      <AuthContainerComponent>
        <Box mt={24}>
          <Text style={styles.signUp}>Sign up</Text>
        </Box>
        <Box mt={16}>
          <Text style={styles.enderCode}>Enter the 6-digit that we have sent via the mail <Text
            style={styles.enderCodeBold}>{email}</Text></Text>
        </Box>
        <Box pt={32}>
          <CodeField
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                style={[errorMessage ? styles.inputContainerRed : isFocused ? styles.inputContainerOrange : styles.inputContainer]}>
                <Text
                  key={index}
                  style={styles.code}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          {errorMessage &&
            <Text style={styles.errorCodeMessage}>{errorMessage}</Text>
          }
        </Box>
        <Box pt={32}>
          <CustomButton
            variant={BUTTON_VARIANTS.primary}
            onPress={handlePressContinue}
            title="Coninue"
            rightIcon="arrow-right"
            disabled={value.length < 6}
            isLoading={isLoading}
          />
        </Box>
        <Box pt={30} direction="row" alignItems="center" justifyContent="center">
          {totalSeconds > 60 ?
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendCodeOrange}>Resend code</Text>
            </TouchableOpacity>
            :
            <Text style={styles.resendCodeGray}>Resend code</Text>
          }
          <AppIcon name="timer" size={20} color="orange" />
          <Text style={styles.timer}>{totalSeconds < 60 ? `00:${59 - totalSeconds}` : "00:00"}</Text>
        </Box>
      </AuthContainerComponent>
    </SafeAreaView>
  );
};

export default EnterVerificationCode;

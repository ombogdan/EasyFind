import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Header } from 'components/header';
import { Box } from 'ui-kit/box';
import CustomInput from 'ui-kit/custom-input/custom-input.component';
import { SIZE } from 'shared/constants';
import { useStyles } from './change-password.styles';
import useChangePassword from './change-password.hook';

const ChangePassword = () => {
  const styles = useStyles();
  const { password, validFields, onChangePassword, onPressUpdate, is_loading } =
    useChangePassword();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIsLoading={is_loading}
        backButtonText="Cancel"
        leftButtonText="Update"
        onPressLeftButton={onPressUpdate}
        name="Change Password"
      />
      <Box pl={SIZE.md} pr={SIZE.md}>
        <Box pt={SIZE.xl}>
          <Text style={styles.titleText}>Old password*</Text>
          <Box pt={SIZE.sm}>
            <CustomInput
              value={password.password}
              secureTextEntry
              onChangeValue={onChangePassword('password')}
              styleContainer={styles.reviewInputContainer}
              placeholder="Old Password"
              errorMessage={validFields.password}
            />
          </Box>
          <Box mt={SIZE.md} />
          <Text style={styles.titleText}>New password*</Text>
          <Box pt={SIZE.sm}>
            <CustomInput
              secureTextEntry
              value={password.new_password}
              onChangeValue={onChangePassword('new_password')}
              styleContainer={styles.reviewInputContainer}
              placeholder="New Password"
              errorMessage={validFields.new_password}
            />
          </Box>
          <Box mt={SIZE.md} />
          <Text style={styles.titleText}>Confirm New Password*</Text>
          <Box pt={SIZE.sm}>
            <CustomInput
              secureTextEntry
              value={password.new_password_confirm}
              onChangeValue={onChangePassword('new_password_confirm')}
              styleContainer={styles.reviewInputContainer}
              placeholder="Confirm New Password"
              errorMessage={validFields.new_password_confirm}
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default ChangePassword;

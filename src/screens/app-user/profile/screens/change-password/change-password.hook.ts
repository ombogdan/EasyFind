import { useState } from 'react';
import { useUpdatePassword } from 'shared/hooks/api';
import { goBack } from 'shared/navigation/root-navigator.config';
import { LoadingType } from 'shared/types';
import { showToast } from 'shared/utils/show-toast';

enum PasswordErrors {
  IS_VALID = '',
  IS_EMPTY = 'Required Field',
  IS_NOT_MATCH = 'Invalid Password',
}

const DEFAULT_VALUE = {
  new_password: '',
  password: '',
  new_password_confirm: '',
};

const useChangePassword = () => {
  const { loading, updatePassword } = useUpdatePassword();
  const [password, setPassword] = useState(DEFAULT_VALUE);
  const [validFields, setValidFields] = useState({
    new_password: PasswordErrors.IS_VALID,
    password: PasswordErrors.IS_VALID,
    new_password_confirm: PasswordErrors.IS_VALID,
  });

  const onChangePassword =
    (key: keyof typeof DEFAULT_VALUE) => (text: string) => {
      setValidFields({
        ...validFields,
        [key]: PasswordErrors.IS_VALID,
      });
      setPassword({
        ...password,
        [key]: text,
      });
    };

  const validatePassword = () => {
    let isValid = true;

    const fields: Array<keyof typeof DEFAULT_VALUE> = [
      'password',
      'new_password',
      'new_password_confirm',
    ];
    const newValidFields = { ...validFields };

    fields.forEach((field) => {
      if (!password[field].trim()) {
        newValidFields[field] = PasswordErrors.IS_EMPTY;
        isValid = false;
      }
    });

    if (password.new_password !== password.new_password_confirm) {
      newValidFields.new_password = PasswordErrors.IS_NOT_MATCH;
      newValidFields.new_password_confirm = PasswordErrors.IS_NOT_MATCH;
      isValid = false;
    }

    setValidFields(newValidFields);

    return isValid;
  };

  const onPressUpdate = () => {
    if (!validatePassword()) {
      return;
    }
    updatePassword({
      data: password,
      successCallback: () => {
        showToast({
          type: 'success',
          text1: 'Password successfully changed',
        });
        goBack();
      },
    });
  };

  return {
    onPressUpdate,
    onChangePassword,
    password,
    validFields,
    is_loading: loading === LoadingType.FETCH,
  };
};

export default useChangePassword;

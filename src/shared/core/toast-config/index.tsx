import React from 'react';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import { AppIcon } from 'shared/assets';
import { FONT_SIZE, SIZE } from 'shared/constants';
import { useTheme } from 'shared/theme/ThemeProvider';

const createToastConfig = () => {
  const { theme } = useTheme();

  return {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          borderLeftWidth: 1,
          borderLeftColor: theme.palette.success,
          borderColor: theme.palette.success,
          borderWidth: 1,
          borderRadius: SIZE.md,
          backgroundColor: theme.palette.successLight,
          alignItems: 'center',
          paddingHorizontal: SIZE.md,
        }}
        renderLeadingIcon={() => (
          <AppIcon color="success" name="check-green" size={20} />
        )}
        contentContainerStyle={{
          paddingLeft: SIZE.sm,
          backgroundColor: theme.palette.successLight,
          borderRadius: SIZE.md,
        }}
        text1Style={{
          fontSize: FONT_SIZE.md,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: FONT_SIZE.md,
        }}
      />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftWidth: 1,
          borderLeftColor: theme.palette.danger,
          borderColor: theme.palette.danger,
          borderWidth: 1,
          borderRadius: SIZE.md,
        }}
        contentContainerStyle={{
          paddingHorizontal: SIZE.md,
          backgroundColor: theme.palette.dangerLight,
          borderRadius: SIZE.md,
        }}
        text1Style={{
          fontSize: FONT_SIZE.md,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: FONT_SIZE.md,
        }}
      />
    ),
  };
};

export default createToastConfig;

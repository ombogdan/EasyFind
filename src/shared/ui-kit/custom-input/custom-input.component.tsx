import React, { forwardRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CustomInputProps } from 'ui-kit/custom-input/custom-input.types';
import { useTheme } from 'shared/theme/ThemeProvider';
import { AppIcon } from 'assets/index';
import { hexToRGBA } from "utils/hexToRgba";
import { useStyles } from './custom-input.styles';

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(
  (props: CustomInputProps, ref: React.ForwardedRef<TextInput>) => {
    const {
      value,
      onChangeValue,
      placeholder,
      styleContainer,
      styleInput,
      name,
      errorMessage,
      keyboardType = 'default',
      leftIcon,
      rightIcon,
      search,
      onFocus,
      onBlur,
      onRightIconPress,
      multiline = false,
      autoFocus = false,
      editable = true,
      errorMessageStyles,
    } = props;
    const styles = useStyles({
      error: errorMessage,
      leftIcon,
      rightIcon,
      search,
    });
    const { theme } = useTheme();

    const handleFocus = (e: any) => {
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: any) => {
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <View style={[styles.container, styleContainer]}>
        {name && (
          <View style={styles.label}>
            <Text style={styles.labelText}>{name}</Text>
          </View>
        )}
        <View style={[styles.inputContainer, styleInput]}>
          {leftIcon && (
            <AppIcon name={leftIcon} style={styles.leftIcon} color="white" />
          )}
          <TextInput
            ref={ref}
            editable={editable}
            autoFocus={autoFocus}
            style={[styles.input, styleInput]}
            onChangeText={onChangeValue}
            value={value}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
            keyboardType={keyboardType}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={hexToRGBA(theme.palette.white, 0.8)}
          />
          {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress}>
              <AppIcon name={rightIcon} style={styles.rightIcon} />
            </TouchableOpacity>
          )}
        </View>
        {errorMessage && (
          <Text
            style={[
              styles.errorMessage,
              errorMessageStyles || {},
            ]}
          >
            {errorMessage}
          </Text>
        )}
      </View>
    );
  },
);

export default CustomInput;

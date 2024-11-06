import React from "react";
import { View, Pressable, Text } from "react-native";
import Lottie from "lottie-react-native";
import { ButtonProps } from "shared/ui-kit/custom-button/custom-button.types";
import { useTheme } from "shared/theme/ThemeProvider";
import {
  BUTTON_VARIANTS,
  LOTTIE_BLACK_LOADER,
  LOTTIE_WHITE_LOADER
} from "shared/constants";
import { AppIcon } from "assets/index";
import { useStyles } from "./custom-button.styles";

const CustomButtonComponent = ({
                                 title,
                                 onPress,
                                 containerStyle,
                                 disabled = false,
                                 isLoading = false,
                                 variant = "primary",
                                 leftIcon,
                                 rightIcon,
                                 iconSize
                               }: ButtonProps) => {
  const styles = useStyles({ disabled, title });
  const { theme } = useTheme();
  let color: string = theme.palette.dark;
  let btnBackgroundColor: string = theme.palette.accent;
  let loader: string = LOTTIE_BLACK_LOADER;

  // eslint-disable-next-line default-case
  switch (variant) {
    case BUTTON_VARIANTS.primary: {
      color = theme.palette.dark;
      btnBackgroundColor = disabled ? theme.palette.accentDisabled1 : theme.palette.accent;
      loader = LOTTIE_WHITE_LOADER;
      break;
    }
    case BUTTON_VARIANTS.secondary: {
      color = disabled ? theme.palette.accentDisabled : theme.palette.accent;
      btnBackgroundColor = theme.palette.secondary;
      loader = LOTTIE_BLACK_LOADER;
      break;
    }
  }

  const defineBtnStyle = (prs: { pressed: boolean }) => {
    const { pressed } = prs;
    // eslint-disable-next-line default-case
    switch (variant) {
      case BUTTON_VARIANTS.primary: {
        if (!disabled) {
          color = theme.palette.white;
          // eslint-disable-next-line no-nested-ternary
          btnBackgroundColor = pressed
            ? theme.palette.accentPressed
            : theme.palette.orange;
        }
        break;
      }
      case BUTTON_VARIANTS.secondary: {
        if (!disabled) {
          color = pressed ? theme.palette.accentHover : theme.palette.secondary;
          // eslint-disable-next-line no-nested-ternary
          btnBackgroundColor = pressed
            ? theme.palette.disabled
            : theme.palette.secondary;
        }
        break;
      }
    }
    return [
      styles.button,
      { backgroundColor: btnBackgroundColor },
      containerStyle
    ];
  };

  function defineTextStyle(pressed: boolean) {
    // eslint-disable-next-line default-case
    switch (variant) {
      case BUTTON_VARIANTS.primary: {
        if (!disabled) {
          color = theme.palette.dark;
        } else {
          color = theme.palette.disabled;
        }
        break;
      }
      case BUTTON_VARIANTS.secondary: {
        if (!disabled) {
          // eslint-disable-next-line no-nested-ternary
          color = pressed ? theme.palette.dark : theme.palette.dark;
        }
        break;
      }
    }
    return [{ color }];
  }

  const onButtonPress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={onButtonPress}
      disabled={disabled || isLoading}
      style={defineBtnStyle}>
      {({ pressed }) => (
        <View>
          {!isLoading ? (
            <View style={styles.textContainer}>
              {leftIcon &&
                <AppIcon name={leftIcon} style={styles.iconLeft} size={iconSize || 24} />
              }
              <Text style={[defineTextStyle(pressed), styles.btnText]}>
                {title}
              </Text>
              {rightIcon &&
                <AppIcon
                  name={rightIcon}
                  style={styles.iconRight}
                  size={iconSize || 24}
                  color="white" />
              }
            </View>
          ) : (
            <Lottie style={styles.loader} source={loader} autoPlay loop />
          )}
        </View>
      )}
    </Pressable>
  );
};

const CustomButton = React.memo(CustomButtonComponent);

export default CustomButton;

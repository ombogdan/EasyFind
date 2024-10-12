import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomHeaderProps } from "components/header/header.types";
import { CustomButton } from "ui-kit/custom-button";
import { BUTTON_VARIANTS } from "constants/index";
import { goBack } from "shared/navigation/root-navigator.config";
import { useScale } from "hooks/useScale";
import { useStyles } from "./header.styles";

const Header = ({
                  name,
                  backButton,
                  cancelButtonText,
                  leftIcon,
                  backButtonText,
                  leftButtonText,
                  onPressLeftButton,
                  leftIsLoading
                }: CustomHeaderProps) => {
  const styles = useStyles();
  const scale = useScale();

  return (
    <View style={styles.container}>
      {backButton && !cancelButtonText &&
        <View style={styles.leftButtonContainer}>
          <CustomButton
            containerStyle={{ height: scale(40) }}
            variant={BUTTON_VARIANTS.secondary}
            onPress={goBack}
            rightIcon="backIcon"
          />
        </View>
      }
      {backButtonText &&
        <CustomButton
          containerStyle={{ paddingHorizontal: scale(16) }}
          variant={BUTTON_VARIANTS.secondary}
          onPress={goBack}
          title={backButtonText}
        />
      }
      {cancelButtonText && !backButton &&
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.cancelText}>{cancelButtonText}</Text>
        </TouchableOpacity>
      }
      {!backButton && !backButtonText && (leftButtonText || leftIcon) &&
        <View style={styles.leftButtonContainer} />
      }
      <Text ellipsizeMode="middle" numberOfLines={1} style={styles.nameText}>{name}</Text>
      {backButton && !leftIcon && !leftButtonText &&
        <View style={styles.leftButtonContainer} />
      }
      {leftIcon && onPressLeftButton &&
        <View style={styles.leftButtonContainer}>
          <CustomButton
            containerStyle={{ height: scale(40) }}
            variant={BUTTON_VARIANTS.secondary}
            onPress={onPressLeftButton}
            leftIcon={leftIcon}
          />
        </View>
      }
      {leftButtonText && onPressLeftButton &&
        <CustomButton
          containerStyle={{ paddingHorizontal: scale(16) }}
          variant={BUTTON_VARIANTS.primary}
          onPress={onPressLeftButton}
          title={leftButtonText}
          isLoading={leftIsLoading}
        />
      }
    </View>
  );
};


export default Header;

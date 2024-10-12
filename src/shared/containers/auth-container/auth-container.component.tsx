import React from "react";
import { SafeAreaView, View } from "react-native";
import { AppIcon } from "shared/assets";
import { useStyles } from "./auth-container.styles";
import { CustomOnboardingProps } from "./auth-container.types";

const AuthContainerComponent = ({ children, withoutLogo, containerStyle }: CustomOnboardingProps) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={[styles.container, containerStyle]}>
        {!withoutLogo &&
        <AppIcon name="logo" enable_color={false} color='danger' size={70}/>
        }
        {children}
      </View>
    </SafeAreaView>
  );
};

export default AuthContainerComponent;

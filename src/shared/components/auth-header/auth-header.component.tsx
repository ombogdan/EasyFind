import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomHeaderProps } from "components/header/header.types";
import { goBack } from "shared/navigation/root-navigator.config";
import { Box } from "ui-kit/box";
import { AppIcon } from "assets/index";
import { useStyles } from "./auth-header.styles";

const AuthHeader = ({ leftText, rightText }: CustomHeaderProps) => {
  const styles = useStyles();


  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack}>
        <Box direction="row" alignItems="center">
          <AppIcon name="left-button" size={24} color="orange" />
          {leftText &&
            <Text style={styles.backText}>{leftText}</Text>
          }
        </Box>
      </TouchableOpacity>
      <Text style={styles.logIn}>{rightText}</Text>
    </View>
  );
};


export default AuthHeader;

import React from "react";

import { Text, TouchableOpacity } from "react-native";
import { AppIcon } from "assets/index";
import Lottie from "lottie-react-native";
import { LOTTIE_BLACK_LOADER, LOTTIE_WHITE_LOADER } from "constants/index";
import { useStyles } from "./sign-button.styles";
import { SignButtonProps } from "./sign-button.types";


const SignButton = ({ apple, isLoading, onPress, title }: SignButtonProps) => {
  const styles = useStyles({ apple });

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      {!isLoading ?
        <>
          {apple ?
            <AppIcon name="apple" color="white" />
            :
            <AppIcon name="google" enable_color={false} />
          }
          <Text style={styles.textColor}>{title}</Text>
        </>
        :
        <Lottie style={styles.loader} source={apple ? LOTTIE_WHITE_LOADER : LOTTIE_BLACK_LOADER} autoPlay loop />
      }
    </TouchableOpacity>
  );
};

export default SignButton;

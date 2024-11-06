import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppIcon } from "assets/index";
import { useTranslation } from "react-i18next";
import { SearchProps } from "./search-bar.types";
import { useStyles } from "./search-bar.styles";

const SearchBarComponent = ({ onPress }: SearchProps) => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppIcon name="search" size={25} color="grayLight" />
      <Text style={styles.searchPlaceholder}>{t("searchPlaceholder")}</Text>
    </TouchableOpacity>
  );
};

const CustomButton = React.memo(SearchBarComponent);

export default CustomButton;
